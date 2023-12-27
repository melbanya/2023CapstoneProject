<template>
  <div id="app">
    <Sidebar @loadData="handleLoadData" @openAuthModal="handleOpenAuthModal"/>
    <CheckListModal ref="checkListModal" />
    <AuthModal ref="authModal"/>
    <div class="content">
      <div class="map-container">
        <div id="map"></div>
        <button class="position-button" @click="goToCurrentPosition">현재 위치로</button>
      </div>
      <div id="myModal" class="modal" v-if="show">
        <div class="modal-content">
          <span class="close" @click="show = false">&times;</span>
          <div class="title" v-html="modalContent.title"></div>
          <div class="address" v-html="modalContent.address"></div>
          <!-- shelters 데이터에서 추가 -->
          <div class="area" v-if="modalContent.area" v-html="modalContent.area"></div>
          <!-- emergencyRooms 데이터에서 추가 -->
          <div class="number" v-if="modalContent.phone" v-html="modalContent.phone"></div>
      </div>

      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from './views/SideBar.vue';
import CheckListModal from './views/CheckListModal.vue';
import AuthModal from "./views/AuthModal.vue";
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['shelters','emergencyRooms']),
  },
  components: {
    Sidebar,
    CheckListModal,
    AuthModal,
  },
  data() {
    return {
      map: null,
      markers: [],
      show: false,
      modalContent: '',
    };
  },
  methods: {
  ...mapActions(['fetchShelters', 'fetchEmergencyRooms']),
  openCheckListModal() {
    this.$refs.checkListModal.openModal();
  },
  handleOpenAuthModal() {
      this.$refs.authModal.openModal();
    },
  goToCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
    const locPosition = new this.$kakaoMapApi.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.setCenter(locPosition);
    }, () => {
    alert('위치정보가 거부되었습니다.');
  });
},
async handleLoadData(dataType) {
  this.clearPins();
  let data;
  switch (dataType) {
    case 'shelters':
      await this.fetchShelters();
      data = this.shelters;
      this.addPinsToMap(data, 'shelters');
      break;
    case 'emergencyRooms':
      await this.fetchEmergencyRooms();
      data = this.emergencyRooms;
      this.addPinsToMap(data, 'emergencyRooms');
      break;
    case 'checklists':
      this.$refs.checkListModal.openModal();
      break;
  }
  this.map.setLevel(7);
},

clearPins() {
  // 지도에 추가된 모든 마커를 제거
  for(let i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  }
  this.markers = [];
},
addPinsToMap(data, dataType) {
  data.forEach((item) => {
    let lat, lon, markerPosition, marker;
    if (dataType === 'shelters') {
      lat = item.LAT;
      lon = item.LON;
    } else if (dataType === 'emergencyRooms') {
      lat = item.WGS84LAT;
      lon = item.WGS84LON;
    }

    markerPosition = new this.$kakaoMapApi.LatLng(lat, lon);
    marker = new this.$kakaoMapApi.Marker({
      position: markerPosition
    });

    // 클릭 이벤트 추가
    this.$kakaoMapApi.event.addListener(marker, 'click', () => {
      this.openModal(item, dataType);
    });

    marker.setMap(this.map);
    this.markers.push(marker);
  });
},
openModal(item, dataType) {
  if (dataType === 'shelters') {
    this.modalContent = {
      title: item.VT_ACMDFCLTY_NM,
      address: item.DTL_ADRES,
      area: `시설면적 : `+item.FCLTY_AR,
    };
  } else if (dataType === 'emergencyRooms') {
    this.modalContent = {
      title: item.DUTYNAME,
      address: item.DUTYADDR,
      // isOperated: item.DUTYERYN,
      phone: `응급실 번호 : `+item.DUTYTEL3
    };
  }
  this.show = true;
},
},

mounted() {
  this.$nextTick(async () => {
    const maps = await this.$kakaoMapApi;
    if (maps) {
      this.$kakaoMapApi = maps;
      const container = document.getElementById('map');
      navigator.geolocation.getCurrentPosition((position) => {
        const options = {
          center: new maps.LatLng(position.coords.latitude, position.coords.longitude),
          level: 6
        };
        this.map = new maps.Map(container, options);
      }, () => {
        console.log('위치정보가 거부되었습니다.');
        const options = {
          center: new maps.LatLng(37.55839387727673, 127.0490540930369),
          level: 6
        };
        this.map = new maps.Map(container, options);
      });

    }
  });
}
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");
* {
  font-family: "Pretendard Variable";
  font-size: 1rem;
}
body {
  margin: 0 !important;
  padding: 0;
}

#app {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  height: 100vh;
  overflow: hidden;
}

.map-container {
  position: relative;
}

#map {
  width: 100vw;
  height: 100vh;
}

.position-button {
  position: absolute !important;
  right: 24px !important;
  top: 24px !important;
  z-index: 1000;
  background-color: rgb(255, 202, 67);
  color: #000000;
  padding: 0.5rem 0.4rem;
  border-radius: 1rem;
  border: 3px solid #2878ff;
  font-size: 0.8rem;
  font-weight: 500;
}

.modal {
  display: block !important;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: 20% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 40% !important;
  height: auto;
  overflow: auto;
}

.close {
  display: flex;
  color: #2878ff;
  float: left;
  font-size: 28px;
  font-weight: bold;
  justify-content: flex-end;
  flex-direction: row;
}

.close:hover,
.close:focus {
  color:rgb(255, 202, 67);
  text-decoration: none;
  cursor: pointer;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}
.address {
  color: #818181;
  font-weight: 500;
}

.modal-content div {
  text-align: center;
}
.modal-content div:last-child {
  margin-bottom: 20px;
}

</style>
