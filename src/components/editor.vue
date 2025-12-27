<template>
    <div class="row">
        <div class="col">
            <div class="card border-0 text-center">
                <div class="card-header" style="background-color:#00263d">
                    <ul class="nav nav-tabs card-header-tabs mx-auto">
                        <li class="nav-item rounded-0">
                            <a class="nav-link rounded-0 text-light" :class="tab == 'news' ? 'active text-dark' : null"
                                @click="tab = 'news'; currentTab = 'news'; newsData.tag = 'news'" href="#">News</a>
                        </li>
                        <li class="nav-item rounded-0">
                            <a class="nav-link text-light rounded-0"
                                :class="tab == 'announcements' ? 'active text-dark' : null"
                                @click="tab = 'announcements'; currentTab = 'announcement'; newsData.tag = 'announcement'" href="#">Announcements</a>
                        </li>
                        <li class="nav-item rounded-0">
                            <a class="nav-link text-light rounded-0"
                                :class="tab == 'articles' ? 'active text-dark' : null" @click="tab = 'articles'; currentTab = 'article'; newsData.tag = 'article'"
                                href="#">Articles</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body text-start">
                    <div v-if="tab == 'news'">
                        <div class="alert alert-light border-0 rounded-1 shadow alert-dismissible fade show "
                            @click="currentTab = 'news', newsData = news, assignUpdate()" v-for="(news, i) in allNews"
                            :key="i" role="alert">
                            {{ news.header }}
                            <button type="button" @click="confirmDelete(news.id)" class="btn-close"
                                data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    <div v-if="tab == 'announcements'">
                        <div class="alert alert-light border-0 rounded-1 shadow alert-dismissible fade show"
                            @click="currentTab = 'announcement', newsData = announcement, assignUpdate()" role="alert"
                            v-for="(announcement, i) in announcements" :key="i">
                            {{ announcement.header }}
                            <button type="button" @click="confirmDelete(announcement.id)" class="btn-close"
                                data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    <div v-if="tab == 'articles'">
                        <div class="alert alert-light border-0 rounded-1 shadow alert-dismissible fade show"
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
        <div class="demo col-lg-8 col-sm-12 my-0 ">
            <div>
                <div class="pb-4">
                    <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-1"
                        :class="currentTab == 'announcement' ? 'isActive' : null"
                        @click="selectTab('announcement'), newsData.tag = 'announcement', tab = 'announcements'">Announcement</button>
                    <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-1"
                        :class="currentTab == 'news' ? 'isActive' : null"
                        @click="selectTab('news'), newsData.tag = 'news', tab = 'news'">News</button>
                    <button class="btn btn-sm btn-outline-primary mx-2 px-3 rounded-1"
                        :class="currentTab == 'article' ? 'isActive' : null"
                        @click="selectTab('article'), newsData.tag = 'article', tab = 'articles'">Article</button>
                </div>
                <div class="mb-3" v-if="currentTab === 'announcement'">
                    <label for="title" class="form-label fs-6">Title</label>
                    <input type="text" style="font-size: 13px;"
                        class="form-control fw-light text-dark rounded-1 form-control-sm" id="title"
                        v-model="newsData.header" placeholder="Innovations in Ghana">
                    <label for="image" class="form-label fs-6">Image</label>
                    <input style="font-size: 13px;" class="form-control fw-light text-dark rounded-1 form-control-sm "
                        type="file" ref="fileInput" @change="handleFileChange" />
                    <label for="content" class="form-label fs-6">Content</label>
                    <textarea style="font-size: 13px;" class="form-control fw-light text-dark rounded-1 form-control-sm"
                        v-model="newsData.content" id="content" rows="3"></textarea>
                </div>
                <div class="mb-3" v-if="currentTab === 'news'">
                    <label for="title" class="form-label fs-6">Title</label>
                    <input type="text" style="font-size: 13px;"
                        class="form-control fw-light text-dark rounded-1 form-control-sm" id="title"
                        v-model="newsData.header" placeholder="News Title">
                    <label for="link" class="form-label fs-6">Link</label>
                    <input type="text" style="font-size: 13px;"
                        class="form-control fw-light text-dark rounded-1 form-control-sm" v-model="newsData.link"
                        id="link" placeholder="News Link">
                </div>
                <div class="mb-3" v-if="currentTab === 'article'" :key="editorKey">
                    <label for="title" class="form-label fs-6">Title</label>
                    <input type="text" style="font-size: 13px;"
                        class="form-control fw-light text-dark rounded-1 form-control-sm" id="title"
                        v-model="newsData.header" placeholder="Article Title">
                    <label for="title" class="form-label fs-6">Author</label>
                    <select style="font-size: 13px;" class="form-select  fw-light text-dark rounded-1 form-select-sm"
                        v-model="newsData.studentId" aria-label="Small select example">
                        <option :value="null" selected>select author</option>
                        <option :value="student.id" v-for="(student, i) in students" :key="i">{{ student.name }} - <span
                                style="font-size: 11px;">{{ student.tag }}</span> </option>
                    </select>
                    <label for="image" class="form-label fs-6">Image</label>
                    <input style="font-size: 13px;" class="form-control fw-light text-dark rounded-1 form-control-sm "
                        type="file" ref="fileInput" @change="handleFileChange" />
                    <h5 class="mt-3" style="text-align: start;">Start an Article</h5>
                    <!-- <Editor class="shadow-lg p-3x" ref="editor" :data="newData" :config="config" @change="changeFn" :initEditorMethod="initializedFn" /> -->
                    <div id="editorjs"></div>
                </div>
                <button @click="saveNews" v-if="!update" class="btn btn-sm px-4 btn-warning my-4">Save</button>
                <button @click="updateNews" v-if="update" class="btn btn-sm px-4 mx-2 btn-warning my-4">Save
                    Changes</button>
                <button @click="emptyData" v-if="update" class="btn btn-sm  px-4 mx-2 btn-warning my-4">+</button>

                <!-- <button @click="invokeSave" class="btn btn-sm btn-warning my-4">Save</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import imageCompression from 'browser-image-compression';
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
            editorKey: 0,
            updateImg: false,
            newData: null,
            editorInstance: null,
            newsData: {
                header: null,
                image: null,
                content: null,
                tag: null,
                studentId: null
            },
            update: false,
            allNews: [],
            announcements: [],
            articles: [],
            students: []
        };
    },
    mounted() {
        this.initializeEditor();
        this.getNews()
        this.getStudents()
    },
    methods: {
        initializeEditor() {
            this.editorInstance = new EditorJS({
                holder: 'editorjs',
                inlineToolbar: ['link', 'bold', 'italic'],
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: ['link', 'bold', 'italic'],
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
            console.log('Editor initialized:', this.editorInstance)
        },
        getNews() {
            axios.get('https://mikrobotacademy.com/api/news/')
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
        getStudents() {
            axios.get('https://mikrobotacademy.com/api/students/'
            ).then(response => {
                this.students = response.data
            }).catch(error => {
                console.log(error.response)
            })
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
            
            // Initialize editor when switching to article tab in new item mode
            if (tab === 'article' && !this.update) {
                this.$nextTick(() => {
                    if (this.editorInstance) {
                        this.editorInstance.destroy();
                    }
                    this.editorInstance = null;
                    this.initializeEditor();
                });
            }
        },
        async handleFileChange(event) {
            this.updateImg = true;
            const file = event.target.files[0];

            if (file) {
                try {
                    const options = {
                        maxSizeMB: 0.1,
                        maxWidthOrHeight: 1024,
                        useWebWorker: true,
                    };

                    const compressedFile = await imageCompression(file, options);

                    const renamedCompressedFile = new File(
                        [compressedFile],
                        file.name,
                        { type: compressedFile.type }
                    );

                    this.newsData.image = renamedCompressedFile;
                } catch (error) {
                    console.error('Error compressing image:', error);
                }
            }
        },
        assignUpdate() {
            this.update = true
            this.updateImg = false
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
            formData.append('studentId', this.newsData.studentId);

            try {
                const response = await axios.post(
                    'https://mikrobotacademy.com/api/news/',
                    formData,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
                this.emptyData()
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
        async emptyData() {
            this.newsData = {
                header: null,
                image: null,
                content: null,
                link: null,
                tag: null
            }
            this.update = false;
            
            if (this.currentTab === 'article' && this.editorInstance) {
                try {
                    // Clear the editor content
                    await this.editorInstance.clear();
                    // Reset any saved data
                    this.newData = null;
                    // Force re-render of the editor
                    this.editorKey++;
                    this.initializeEditor();
                } catch (error) {
                    console.error('Error clearing editor:', error);
                    // Fallback to full reinitialization if clearing fails
                    this.editorInstance = null;
                    this.$nextTick(() => {
                        this.initializeEditor();
                    });
                }
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
.form-control,
.form-select {
    background-color: #d9d9d941;
}

.btn-outline-primary {
    background-color: #00263d;
    color: #fff;
    border: none;
    transition: all 0.2s ease;
}

.btn-outline-primary:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

.btn-outline-primary.isActive {
    background-color: #00388d;
    color: #fff;
    box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.25);
    position: relative;
    z-index: 1;
}

.btn-outline-primary.isActive::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #00388d;
}

.demo {
    margin: 20px;
}

.alert:hover {
    background-color: rgba(240, 240, 240, 0.803);
}

.card-header {
    background-color: #00263d;
    font-size: 13px;
    padding-inline: 1px;
    padding-block: 5px;
}

.nav-link {
    padding-block: 6px;
    border-bottom: none;
    border-inline: none;
}

.nav-link:hover {
    border-bottom: none;
    border-inline: none;
}

.card-body {
    padding: 0px;
    border: none;
    padding-block: 20px;
    font-size: 14px;
}
</style>

<style>
.codex-editor__redactor {
    padding-bottom: 30px !important;
}

#editorjs {
    background-color: rgb(243, 242, 242);
    border: 1px solid rgb(120, 120, 120);
    padding: 5px;
    border-radius: 2px;
    font-size: 80%
}
</style>