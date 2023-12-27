<template>
    <div id="checkListModal" class="modal" v-if="show">
        <div class="modal-content">
            <span class="close" @click="show = false">&times;</span>
            <div class="title">&#128204; 재난대비 체크리스트</div>
            <div class="box">
            <div v-for="(items, category) in categorizedChecklists" :key="category">
                <div class="bold-text">{{ category }}</div>
                <ul>
                    <li v-for="item in items" :key="item.checklist_id">{{ item.item }}</li>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            show: false,
        }
    },
    computed: {
        ...mapState(['checklists']),
        categorizedChecklists() {
            return this.checklists.reduce((categories, item) => {
                const categoryName = item.category.category_name;
                if (!categories[categoryName]) {
                    categories[categoryName] = [];
                }
                categories[categoryName].push(item);
                return categories;
            }, {});
        }
    },
    methods: {
        openModal() {
            this.show = true;
        },
        closeModal() {
            this.show = false;
        }
    }
}
</script>
<style scoped>
dl, ol, ul {
    margin-bottom: 10px;
    padding : 0;
    list-style-type: none;
}
.modal {
    overflow-y: hidden;
    overflow-x: hidden;     
}
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: 3% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 40% !important;
  height: auto;
  overflow: auto;
}
.box div {
    text-align: center;
}
.bold-text { 
    font-weight: bold;
    margin-bottom: 10px;
    font-size:1.2rem;
}
</style>