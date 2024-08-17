<template>
    <div class="common-layout">
    <el-container>
      <el-header style="padding: 0;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="0">图书管理</el-menu-item>   
            <el-menu-item index="1" @click="dialogFormVisible=true">新增图书</el-menu-item>
            <el-menu-item index="2" @click="loginout">退出登录</el-menu-item>  
        </el-menu>  
      </el-header>
    <el-main>
        <el-card style="max-width: 100%">
        <el-table :data="books" style="width: 100%">
            <el-table-column label="图书编号" prop="id" />
            <el-table-column label="图书名称" prop="name" />
            <!-- <el-table-column label="是否出借" prop="statua" /> -->
            <el-table-column label="是否出借">
                <template #default="scope">
                    <el-tag type="primary" v-if="scope.row.statua">已出借</el-tag>
                    <el-tag type="danger" v-else>未出借</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #header>
                </template>
                <template #default="scope">
                    <el-button size="small" type="primary" icon="Edit" @click="lendboos(scope.row)">图书出借</el-button>
                    <el-button size="small" type="primary" icon="Edit" @click="returnbook(scope.row)">图书归还</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row.id)" icon="Delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="添加图书" width="500">
        <el-form :model="form" :rules="checkform" ref="checkbox">
            <el-form-item label="图书编号" :label-width="formLabelWidth" prop="id">
                <el-input v-model="form.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图书名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addbook(form)">新增</el-button>
            </div>
        </template>
    </el-dialog>
    </el-main>
    </el-container>
  </div>   
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'

export default{
    
    data(){
        return{
            books:[],
            dialogFormVisible:false,
            form:{
                name:"",
                id:""
            },
            checkform:{
                name:[{ required: true, message: '请输入图书名称', trigger: 'blur' }],
                id:[{ required: true, message: '请输入图书编号', trigger: 'blur' }]
            }

        }
    },
    methods:{
        async getbooks(){
            const res=await this.$api.getBooks()
            console.log("res的值:",res)
            this.books=res.data.data
        },
        async delbook(id){
            const res=await this.$api.delBooks(id)
            if (res.data.code===200){
                this.getbooks()
                ElMessage({type: 'success',message: '删除成功',})
            }else{
                ElMessage.error(res.data.message)
            }
        },
        async addbook(data){
            const res= await this.$api.addBooks(data)
            console.log(res)
            if (res.data.code===200){
                ElMessage({type: 'success',message: '新增成功',})
                this.dialogFormVisible=false
                this.getbooks()
            }else{
                ElMessage.error(res.data.message)
            }
        },
        //校验弹窗输入不为空再提交
        checkLogin(){
            this.$refs['reflogin'].validate(
            res =>{
            if (res){
                this.addbook(this.form)
                    }
                }
                )
        },
        // 删除事件的方法
        handleDelete(id){
            console.log(id)
            ElMessageBox.confirm(
            '删除图书后数据将无法恢复，是否确认删除？',
            '提示',
            {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            }
        )
            .then(() => {
            this.delbook(id)
            })
            .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
            })
                },
        async loginout(){                
            const res=await this.$api.logout()
            if (res.data.code===200){
                ElMessage({type: 'success',message: res.data.message,})
                this.$router.push({name:"login"})
            }else{
                ElMessage.error(res.data.message)
            }
            },
        // 图书出借
        async lendboos(row){
            let body={book:row.id,name:row.name}
            const res=await this.$api.lendBoos(body)
            console.log(res)
            if (res.data.code===200){
                ElMessage({type: 'success',message: res.data.message,})
                this.getbooks()
            }else{
                ElMessage.error(res.data.message)
            }
        } ,
        // 图书归还
        async returnbook (row){
            let params={id:row.id,name:row.name}
            const res=await this.$api.returnBook(params)
            if (res.data.code===200){
                ElMessage({type: 'success',message: res.data.message,})
                this.getbooks()
            }else{
                ElMessage.error(res.data.message)
            }
        } 

        },
    // 刷新页面时加载数据
    created(){
        this.getbooks()

    }
                    
}
</script>
<style scoped>

</style>