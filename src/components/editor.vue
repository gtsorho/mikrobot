<template>
<div class="row">
    <div class="col">
        <div class="card text-center">
            <div class="card-header" style="background-color:#004e7c">
                <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a class="nav-link text-light" :class="tab == 'news' ? 'active text-dark' : null" @click="tab = 'news'" href="#">News</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" :class="tab == 'announcements' ? 'active text-dark' : null" @click="tab='announcements'" href="#">Announcements</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" :class="tab == 'articles' ? 'active text-dark' : null" @click="tab='articles'" href="#">Articles</a>
                </li>
                </ul>
            </div>
            <div class="card-body text-start">
                <div v-if="tab == 'news'">
                    <div class="alert alert-light shadow" @click="currentTab = 'news', newsData = news , assignUpdate()" v-for="(news, i) in allNews" :key="i" role="alert">
                        {{news.header}}
                    </div>
                </div>
                <div v-if="tab == 'announcements'">
                    <div class="alert alert-secondary shadow" @click="currentTab = 'announcement', newsData = announcement , assignUpdate()" role="alert" v-for="(announcement, i) in announcements" :key="i">
                        {{announcement.header}}
                    </div>
                </div> 
                <div v-if="tab == 'articles'">
                    <div class="alert alert-light shadow" @click="currentTab = 'article', newsData = article, passEditorProp(article.content) , assignUpdate()" role="alert" v-for="(article, i) in articles" :key="i">
                        {{article.header}}
                    </div>
                </div>
            </div>
        </div>
    </div>
  <div class="demo col-lg-8 col-sm-12">
    <div>
      <div class="">
        <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-pill"  :class="currentTab == 'announcement' ? 'isActive' : null"  @click="selectTab('announcement'), newsData.tag ='announcement' ">Announcement</button>
        <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-pill"  :class="currentTab == 'news' ? 'isActive' : null" @click="selectTab('news'), newsData.tag ='news' ">News</button>
        <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-pill" :class="currentTab == 'article' ? 'isActive' : null" @click="selectTab('article'), newsData.tag ='article' ">Article</button>
      </div>
      <div class="mb-3" v-if="currentTab === 'announcement'">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control form-control-sm" id="title" v-model="newsData.header" placeholder="Innovations in Ghana">
        <label for="image" class="form-label" >Image</label>
        <input class="form-control form-control-sm " type="file" ref="fileInput" @change="handleFileChange" />
        <label for="content" class="form-label">Content</label>
        <textarea class="form-control form-control-sm" v-model="newsData.content" id="content" rows="3"></textarea>
      </div>
      <div class="mb-3" v-if="currentTab === 'news'">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control form-control-sm" id="title" v-model="newsData.header" placeholder="News Title">
        <label for="link" class="form-label">Link</label>
        <input type="text" class="form-control form-control-sm"  v-model="newsData.link" id="link" placeholder="News Link">
      </div>
      <div class="mb-3" v-if="currentTab === 'article'" :key="editorKey">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control form-control-sm" id="title" v-model="newsData.header" placeholder="Article Title">
        <label for="image" class="form-label">Image</label>
        <input class="form-control form-control-sm " type="file" ref="fileInput" @change="handleFileChange" />
        <h1 style="text-align: start;">Start an Article</h1>
        <Editor class="shadow-lg p-3x" ref="editor" :data="newData" :config="config" @change="changeFn" :initEditorMethod="initializedFn" />
      </div>
      <button @click="saveNews" v-if="!update" class="btn btn-sm btn-warning my-4">Save</button>
      <button @click="updateNews" v-if="update" class="btn btn-sm mx-2 btn-warning my-4">Save Changes</button>
      <button @click="emptyData" v-if="update" class="btn btn-sm mx-2 btn-warning my-4">+</button>

      <!-- <button @click="invokeSave" class="btn btn-sm btn-warning my-4">Save</button> -->
    </div>
  </div>
</div>

</template>

<script>
import Editor from 'vue3-editor-js';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code'
import Paragraph from '@editorjs/paragraph'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Checklist from '@editorjs/checklist'
import Marker from '@editorjs/marker'
import Warning from '@editorjs/warning'
import RawTool from '@editorjs/raw'
import Quote from '@editorjs/quote'
import InlineCode from '@editorjs/inline-code'
import Delimiter from '@editorjs/delimiter'
import SimpleImage from '@editorjs/simple-image'
import axios from 'axios';

export default {
    components:{
        Editor
    },
  data() { 
    return {
      currentTab: 'announcement',
      tab:'news',
      newData:null,
      update:false,
      editorKey: 0,
      updateImg:false,
        config: {
            tools:{
            header: {
                class: Header,
                config: {
                placeholder: 'Enter a header',
                levels: [2, 3, 4],
                }
            },
            list: {
                class: List,
                inlineToolbar: true,
            },
            code: {
                class: CodeTool
            },
            paragraph: {
                class: Paragraph,
            },
            embed: {
                class: Embed,
                config: {
                services: {
                    youtube: true,
                    coub: true,
                    imgur: true
                }
                }
            },
            table: {
                class: Table,
                inlineToolbar: true,
                config: {
                rows: 2,
                cols: 3,
                },
            },
            checklist: {
                class: Checklist,
            },
            Marker: {
                class: Marker,
                shortcut: 'CMD+SHIFT+M',
            },
            warning: {
                class: Warning,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+W',
                config: {
                titlePlaceholder: 'Title',
                messagePlaceholder: 'Message',
                },
            },
            raw: RawTool,
            quote: {
                class: Quote,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+O',
                config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author',
                },
            },
            inlineCode: {
                class: InlineCode,
                shortcut: 'CMD+SHIFT+M',
            },
            delimiter: Delimiter,
            image: SimpleImage,
            },
            onReady: () => {
            console.log('on ready')
            },
            onChange: () => {
            console.log('Now I know that Editor\'s content changed!')
            },
            data: { }
        },
        articles:[],
        allNews:[],
        announcements: [],
        editorInstance: null,
        newsData:{
            header:null,
            image:null,
            content:null,
            link:null,
            tag:null
        }
    };
  },
  created(){
    this.getNews()
  },
methods: {
    reloadEditor() {
      this.editorKey += 1;
    },
    getNews(){
        axios.get('https://mikrobotacademy.com/api/news')
        .then(res =>{
          console.log(res.data)
          const groupedData = res.data.reduce((acc, currentItem) => {
          const { tag, ...rest } = currentItem;
          if (!acc[tag]) {
            acc[tag] = [];
          }
          acc[tag].push({ tag, ...rest });
          return acc;
        }, {});

          this.articles = groupedData.article
          this.allNews = groupedData.news
          this.announcements = groupedData.announcement
        })
        .catch(err=>{
          console.log(err)
        })
    },
    initializedFn (editor) {
        this.editorInstance = editor;
    },
    changeFn (editor) {
      console.log(editor)
    },
    selectTab(tab) {
      this.currentTab = tab;
      // Reset form state when changing tabs
      this.hasImage = false;
    },
    handleFileChange(event) {
      this.newsData.image = event.target.files[0];
      this.updateImg = true
    },
    assignUpdate(){
        this.update = true
        this.updateImg = false
        console.log(this.newsData)
    },
    async saveNews() {
        let token = this.getCookie('token');

        if (this.currentTab == 'article') {
            await this.invokeSave();
        }

        const formData = new FormData();
        formData.append('image', this.newsData.image);
        formData.append('header', this.newsData.header);
        formData.append('link', this.newsData.link);
        formData.append('content', this.newsData.content);
        formData.append('tag', this.currentTab);

        try {
            const response = await axios.post(
            'https://mikrobotacademy.com/api/news/',
            formData,
            { headers: { 'Authorization': `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Error uploading:', error);
        }
    },
    async updateNews() {
        let token = this.getCookie('token');
        const formData = new FormData();
        
        if(!this.updateImg){
          delete this.newsData.image
        }

        if (this.currentTab == 'article') {
            await this.invokeSave();
        }

        for (const key in this.newsData) {
          if (this.newsData.hasOwnProperty(key)) {
            formData.append(key, this.newsData[key]);
          }
        }

        try {
            const response = await axios.post(
            'https://mikrobotacademy.com/api/news/update/'+ this.newsData.id,
            formData,
            { headers: { 'Authorization': `Bearer ${token}` } }
            );
            this.emptyData()
            this.update = false
        } catch (error) {
            console.error('Error uploading:', error);
        }
    },
    async invokeSave() {
        return new Promise((resolve, reject) => {
            if (this.editorInstance) {
            this.editorInstance.save()
                .then((data) => {
                this.newsData.content = JSON.stringify(data);
                resolve();
                })
                .catch((error) => {
                console.error('Error saving content:', error);
                reject(error);
                });
            } else {
            console.error('Editor instance not initialized.');
            reject(new Error('Editor instance not initialized.'));
            }
        });
        },  
        passEditorProp(content){
            this.newData = JSON.parse(content)
            this.reloadEditor()
        },
        emptyData(){
            this.newsData={
                header:null,
                image:null,
                content:null,
                link:null,
                tag:null
            }
        },
        getCookie(cname) {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        },
    }
};
</script>

<style>

.btn-outline-primary:hover{
    background-color:#004e7c
}
.btn-outline-primary{
    border:#004e7c 1px solid;
    color:#004e7c
}
.isActive{
    background-color:#004e7c !important;
    color:#fff !important
}
</style>