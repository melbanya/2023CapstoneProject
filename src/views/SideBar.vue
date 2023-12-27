<template>
    <div class="sidebar">
        <div class="menu-button">
        <button @click="loadShelters">&#127759; 지진 대피소</button>
        <button @click="loadEmergencyRooms">&#127973; 서울시 응급실 위치 정보</button>
        <button @click="loadChecklists">&#128204; 재난대비 체크리스트</button>
        </div>
        <div class="bottom">
          <button @click="openAuthModal">로그인/회원가입</button>
        </div>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex';
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['shelters', 'emergencyRooms']),
  },
  methods: {
    ...mapActions(['fetchCheckLists']),
    async loadShelters() {
      this.$emit('loadData', 'shelters');
    },
    async loadEmergencyRooms() {
      this.$emit('loadData', 'emergencyRooms');
    },
    async loadChecklists() {
      await this.fetchCheckLists();
      this.$emit('loadData', 'checklists');
    },
    openAuthModal() {
      this.$emit('openAuthModal'); 
    },
  },
};
</script>

<style scoped>
@keyframes buttonAnimation {
  0% {transform: scale(1);}
  50% {transform: scale(1.05);}
  100% {transform: scale(1);}
}

* {
    border: 0;
}
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20vw;
  height: 100vh;
  background-color: #2878ff;
}

.sidebar .menu-button {
  margin-top: 7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar .menu-button button {
    margin: 2vw 0;
    background-color: rgb(255, 202, 67);
    width: 100%;
    padding: 1.2vw;
    border-radius: 1rem;
    font-size: 1.1vw;
    font-weight: 700;
    transition: all 0.8s ease;
}

.sidebar .menu-button button:hover {
    background-color: rgb(255, 231, 123);
    animation: buttonAnimation 0.8s linear;
}

.sidebar .bottom {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

.sidebar .bottom button {
  width: 100%;
  height: 100%;
  font-size: 1.1vw;
  font-weight: 500;
  transition: all 0.3s ease;
}

.sidebar .bottom button:hover {
    background-color: rgb(255, 255, 255);
    color: #2878ff;
}
</style>
