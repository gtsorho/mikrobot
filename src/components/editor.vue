<template>
    <div class="row">
        <div class="col">
            <div class="card text-center">
                <div class="card-header" style="background-color:#004e7c">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link text-light" :class="tab == 'news' ? 'active text-dark' : null"
                                @click="tab = 'news'" href="#">News</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" :class="tab == 'announcements' ? 'active text-dark' : null"
                                @click="tab = 'announcements'" href="#">Announcements</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" :class="tab == 'articles' ? 'active text-dark' : null"
                                @click="tab = 'articles'" href="#">Articles</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body text-start">
                    <div v-if="tab == 'news'">
                        <div class="alert alert-light shadow alert-dismissible fade show "
                            @click="currentTab = 'news', newsData = news, assignUpdate()" v-for="(news, i) in allNews"
                            :key="i" role="alert">
                            {{ news.header }}
                            <button type="button" @click="confirmDelete(news.id)" class="btn-close"
                                data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    <div v-if="tab == 'announcements'">
                        <div class="alert alert-secondary shadow alert-dismissible fade show"
                            @click="currentTab = 'announcement', newsData = announcement, assignUpdate()" role="alert"
                            v-for="(announcement, i) in announcements" :key="i">
                            {{ announcement.header }}
                            <button type="button" @click="confirmDelete(announcement.id)" class="btn-close"
                                data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    <div v-if="tab == 'articles'">
                        <div class="alert alert-light shadow alert-dismissible fade show"
                            @click="currentTab = 'article', newsData = article, passEditorProp(article.content), assignUpdate()"
                            role="alert" v-for="(article, i) in articles" :key="i">
                            {{ article.header }}
                            <button type="button" @click="confirmDelete(article.id)" class="btn-close"
                                data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="demo col-lg-8 col-sm-12">
            <div>
                <div class="">
                    <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-pill"
                        :class="currentTab == 'announcement' ? 'isActive' : null"
                        @click="selectTab('announcement'), newsData.tag = 'announcement'">Announcement</button>
                    <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-pill"
                        :class="currentTab == 'news' ? 'isActive' : null"
                        @click="selectTab('news'), newsData.tag = 'news'">News</button>
                    <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-pill"
                        :class="currentTab == 'article' ? 'isActive' : null"
                        @click="selectTab('article'), newsData.tag = 'article'">Article</button>
                </div>
                <div class="mb-3" v-if="currentTab === 'announcement'">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control form-control-sm" id="title" v-model="newsData.header"
                        placeholder="Innovations in Ghana">
                    <label for="image" class="form-label">Image</label>
                    <input class="form-control form-control-sm " type="file" ref="fileInput"
                        @change="handleFileChange" />
                    <label for="content" class="form-label">Content</label>
                    <textarea class="form-control form-control-sm" v-model="newsData.content" id="content"
                        rows="3"></textarea>
                </div>
                <div class="mb-3" v-if="currentTab === 'news'">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control form-control-sm" id="title" v-model="newsData.header"
                        placeholder="News Title">
                    <label for="link" class="form-label">Link</label>
                    <input type="text" class="form-control form-control-sm" v-model="newsData.link" id="link"
                        placeholder="News Link">
                </div>
                <div class="mb-3" v-if="currentTab === 'article'" :key="editorKey">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control form-control-sm" id="title" v-model="newsData.header"
                        placeholder="Article Title">
                    <label for="image" class="form-label">Image</label>
                    <input class="form-control form-control-sm " type="file" ref="fileInput"
                        @change="handleFileChange" />
                    <h1 style="text-align: start;">Start an Article</h1>
                    <!-- <Editor class="shadow-lg p-3x" ref="editor" :data="newData" :config="config" @change="changeFn" :initEditorMethod="initializedFn" /> -->
                    <div id="editorjs"></div>
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
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import CodeTool from '@editorjs/code';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Checklist from '@editorjs/checklist';
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import Raw from '@editorjs/raw';
import Quote from '@editorjs/quote';
import InlineCode from '@editorjs/inline-code';
import Delimiter from '@editorjs/delimiter';
import SimpleImage from '@editorjs/simple-image';
import axios from 'axios';

export default {
    data() {
        return {
            currentTab: 'article',
            tab: 'news',
            newData:null,
            editorInstance: null,
            newsData: {
                header: null,
                image: null,
                content: null,
                tag: null,
            },
            update: false,
            allNews: [],
            announcements: [],
            articles: [],
        };
    },
    mounted() {
        this.initializeEditor();
        this.getNews()
    },
    methods: {
        initializeEditor() {
            this.editorInstance = new EditorJS({
                holder: 'editorjs',
                inlineToolbar: ['link', 'bold', 'italic'],
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: ['link', 'bold', 'italic'] ,
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
                    raw: Raw,
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
                data: this.newData,
                onChange: () => {
                    console.log('Editor content changed!');
                },
            });
        },
        getNews() {
            axios.get('https://mikrobotacademy.com/api/news')
                .then(res => {
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
                .catch(err => {
                    console.log(err)
                })
        },
        handleFileChange(event) {
            this.newsData.image = event.target.files[0];
        },
        confirmDelete(id) {
            const isConfirmed = window.confirm('Are you sure you want to delete this item?');
            if (isConfirmed) {
                this.deleteItem(id);
            }
        },
        selectTab(tab) {
            this.currentTab = tab;
            this.hasImage = false;
        },
        handleFileChange(event) {
            this.newsData.image = event.target.files[0];
            this.updateImg = true
        },
        assignUpdate() {
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

            if (!this.updateImg) {
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
                    'https://mikrobotacademy.com/api/news/update/' + this.newsData.id,
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
        passEditorProp(content) {
            this.newData = JSON.parse(content)
            this.initializeEditor()
            this.reloadEditor()
        },
        emptyData() {
            this.newsData = {
                header: null,
                image: null,
                content: null,
                link: null,
                tag: null
            }
            if (this.currentTab == 'article') {
                this.newData = null
                this.initializeEditor()
            }
        },
        confirmDelete(id) {
            const isConfirmed = window.confirm(`Are you sure you want to delete this item`);

            if (isConfirmed) {
                this.deleteItem(id);
            } else {
                console.log('Deletion canceled.');
            }
        },
        deleteItem(id) {
            let token = this.getCookie('token')

            axios.get('https://mikrobotacademy.com/api/news/delete/' + id,
                { headers: { 'Authorization': `Bearer ${token}` } }
            ).then(response => {
                this.getNews()
            }).catch(error => {
                console.log(error.response)
            })
        },
        reloadEditor() {
            this.editorKey += 1;
        },
        getCookie(cname) {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
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
    },
};
</script>

<style scoped>
/* Add any required styles */
.demo {
    margin: 20px;
}

.card-header {
    background-color: #004e7c;
}

.card-body {
    padding: 20px;
}
</style>

<style>
.codex-editor__redactor{
    padding-bottom: 30px !important;
}
#editorjs{
    background-color: rgb(243, 242, 242);
    border: 1px solid rgb(120, 120, 120);
    padding: 5px;
    border-radius:2px;
    font-size:80%
}
</style>