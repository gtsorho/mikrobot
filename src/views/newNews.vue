<template>
    <swiper :pagination="{ type: 'progressbar', }" :navigation="true" :modules="modules" class="mySwiper">
        <swiper-slide class="slide" v-for="(slide, i) in announcements"
            :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${slide.image ? `https://mikrobotacademy.com/news_images/${slide.image}` : null})` }"
            :key="i">
            <div class="container hero-item overlay">
                <a class="post-category-marker" style="  background: #e93314;" href="category.html">Announcement</a>
                <div class="clearfix"></div>
                <h2><a href="post-single.html" class="text-light fw-bolder">{{ slide.header }}</a></h2>
                <p style="font-size:14px" class="text-light fw-medium">{{ slide.content }} </p>
                <div class="clearfix"></div>
                <p class="post-date font-bold fw-normal" style="font-size:12px ;color: #fff;"><i
                        class="bi bi-clock-fill" style="color: #e93314;"></i> {{ convertDate(slide.updatedAt) }}</p>
            </div>
        </swiper-slide>
    </swiper>

    <div class="container my-5 overflow-y-auto " style="max-height:7in">
        <div class="row">
            <!-- Left Section: Featured Articles -->
            <div class="col-lg-8">
                <div class=" align-items-center mb-3 ">
                    <div class="section-title">
                        <h2>Articles</h2>
                        <p class="text-muted my-0" style="font-size: 15px;">Don't miss out</p>
                    </div>
                </div>
                <!-- Featured Article 1 -->
                <div class="shadow-sm mb-4 list-post fl-wrap" style="font-size: 15px; height: 150px;"
                    v-for="(article, index) in articles" :key="index" @click="handleArticle(article.id)">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img style="height: 150px;"
                                :src="article.image ? `https://mikrobotacademy.com/news_images/${article.image}` : noImage"
                                class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    {{ article.header }}
                                </h5>
                                <p class="card-text text-muted" v-if="article.content"
                                    v-html="truncateData(parseData(article.content), 150)"></p>
                                <div class="d-flex align-items-center" style="font-size: 11px;">
                                    <div class="widget-49-date-primary"
                                    :style="`background-image:url('https://mikrobotacademy.com/profile_images/${article.student?.image}') !important`">
                                    </div>
                                    <div>
                                        <span class="me-3">{{article.student?.name}}</span><br>
                                        <span class="text-muted me-3">{{ convertDate(article.updatedAt) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Section: Popular/Recent Articles -->
            <div class="col-lg-4 d-flex align-items-center overflow-y-auto " style="max-height:7in">
                <div>
                    <li class="btn btn-sm w-100 rounded-0 rounded-top-1" style="  background: #e93314; color:#fff;">
                        Popular News
                    </li>
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action  rounded-0"
                            @click="handleNews(news.url)" v-for="(news, i) in allNews" :key="i">
                            <div class="d-flex align-items-center">
                                <img :src="news.image ? news.image : 'src/assets/images/no-photos.png'" alt=""
                                    class="img-thumbnail me-3" width="60" height="60" />
                                <div>
                                    <h6 class="mb-1" style="font-size: 12px;">{{ news.header }}</h6>
                                    <p style="font-size: 10px;">{{ truncateData(news.content, 50) }} ...</p>
                                    <div class="d-flex justify-content-between">
                                        <small class="text-muted d-block fw-medium" style="font-size: 10px;">
                                            {{ truncateData(news.src, 30) }}
                                        </small>
                                        <small class="text-muted fw-light d-block" style="font-size: 10px;">
                                            <i class="bi bi-clock"></i> {{ convertDate(news.updatedAt) }}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import edjsParser from "editorjs-parser";


export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            modules: [Pagination, Navigation],
            noImage: new URL(`../assets/images/article.png`, import.meta.url).href,
            students: {},
            searchQuery: '',
            articles: [],
            allNews: [],
            announcements: [],
        };
    },
    mounted() {
        this.getNews()
    },
    methods: {
        getNews() {
            axios.get('https://mikrobotacademy.com/api/news')
                .then(res => {
                    const groupedData = res.data.reduce((acc, currentItem) => {
                        const { tag, ...rest } = currentItem;
                        if (!acc[tag]) {
                            acc[tag] = [];
                        }
                        acc[tag].push(rest);
                        return acc;
                    }, {});

                    this.articles = groupedData.article
                    this.allNews = groupedData.news
                    this.announcements = groupedData.announcement
                    console.log(groupedData)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        search() {
            axios.get('https://mikrobotacademy.com/api/students/search/' + this.searchQuery
            ).then(response => {
                this.students = response.data
            }).catch(error => {
                console.log(error.response)
            })
        },
        truncateData(data, count) {
            return data.substring(0, count);
        },
        handleArticle(id) {
            this.$router.push({ name: 'article', params: { article: id } })
        },
        handleNews(url) {
            window.location.href = url
        },
        parseData(article) {
            const parser = new edjsParser();
            let articleJson = JSON.parse(article)
            const firstParagraphBlock = articleJson.blocks.find(block => block.type === 'paragraph');
            const markup = parser.parseBlock(firstParagraphBlock);
            return markup
        },
        convertDate(date) {
            const event = new Date(date);
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            return event.toLocaleDateString('en-US', options)
        }
    }
};
</script>

<style scoped>
/* Swiper container */


.hero-item {
    text-align: start;
    max-width: 7in !important;
    margin: 7%;
    color: #fff !important;
}

.hero-item .post-category-marker {
    float: left;
    margin: 0 0 10px 0;

}

.post-category-marker {
    padding: 6px 13px;
    border-radius: 2px;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.6);
}



.swiper {
    width: 100%;
    height: 5in;
}

.swiper-slide {
    text-align: start;
    background: #fff;
    color: #fff;
    display: flex;
    justify-content: start;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.section-title {
    font-weight: bold;
    font-size: 1.5rem;
}

.badge {
    font-size: 0.8rem;
}

.list-group-item .img-thumbnail {
    object-fit: cover;
}

.section-title {
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    position: relative;
}

.section-title::before,
.single-post-header::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 200px;
    height: 1px;
}


.topbar-social li a,
.hnt_title,
.search-submit,
.main-register .tabs-menu li.current a,
.custom-form .log-submit-btn,
.header-cart_wrap_footer a:hover,
.progress-bar,
.subcribe-form .subscribe-button,
.footer-social li a,
.to-top,
.video-section-title a,
.red-bg,
.post-category-marker:hover,
.video-links-wrap .ps__thumb-y,
.cc_btn,
.pag-style .swiper-pagination-bullet.swiper-pagination-bullet-active,
.grid-post-item .post-category-marker,
.section-title::before,
.gs_button,
.color-btn,
.widget-title::before,
.tags-widget a:hover,
.spb-categories_counter,
.sgs-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active,
.list-post-content .post-category-marker,
.slider_widget_title::before,
.hero-section_title h2::before,
.pagination a.current-page,
.pagination a:hover,
.tabs-widget .tabs-menu li.current a,
.search-submit2,
.color-bg,
.banner-widget_content h5::before,
.cat-wid-list li span,
.list-post-media a::after,
.categories_nav-inner a.back,
.list-post-wrap_column .post-category-marker,
.scroller,
.aside-panel li a span,
.grid-post-media a::after,
.list-post::before,
.lmb_center-align,
.profile-card_media,
.single-post-header .post-category-marker,
.single-post-header::after,
.ss-slider-cont,
.ver-share .share-title::before,
.irs-single,
.irs-bar,
.irs-bar-edge,
.fontSize .irs-slider,
.pr-subtitle.prs_big::after,
.share-icon:hover,
.contact-social li a,
.det-box-media span,
.detbox_notifer,
.qty_btn .btn:hover,
.hero-item .post-category-marker,
.hsc-list_item::before,
.hsc-list_item::after,
.ajax-nav li a.current_page,
.picker-wrap-controls li span,
.video-item_active .play-icon,
.play-icon:hover,
.video-holder-title .post-category-marker,
.dark-btn:hover,
.fs-carousel-wrap_title-wrap h4::before,
.multi-pag .swiper-pagination-bullet.swiper-pagination-bullet-active,
.hc-cont,
.hero-carousel-pag .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #e93314;
}

.swiper-button-next,
.swiper-button-prev {
    right: var(--swiper-navigation-sides-offset, 10px);
    left: auto;
}

.list-post::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40%;
    height: 1px;
}

.list-post {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
}

.fl-wrap {
    float: left;
    width: 100%;
    position: relative;
}
 .widget-49-date-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-weight: 500;
  font-size: 1.5rem;
  background-size: cover;
  background-position: 0px;
  background-repeat: no-repeat;
}

</style>