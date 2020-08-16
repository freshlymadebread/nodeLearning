<el-table-column :key="index" v-slot="scope" :sortable="thead.sortable" :prop="thead.prop" :label="thead.label" header-align="center" align="center" :width="thead.width" :fixed="thead.position">
    <div v-if="thead.type === 'time'">
        {{transProp(scope.row, thead.prop) | changeTime}}
    </div>
    <div v-else-if="thead.type === 'link'">
        <router-link :target="thead.target" :to="{path: thead.href, query: transHrefQuery(scope.row, thead.query)}">{{transProp(scope.row, thead.prop)}}</router-link>
    </div>
    <div v-else-if="thead.type === 'number'">
        {{transProp(scope.row, thead.prop) | changeNumber(thead.fixed, thead.extMulti) | number(thead.fixed)}}{{thead.unit}}
    </div>
    <div v-else-if="thead.type === 'text'">
        <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content" style="width: 300px;line-height: 1.6;font-size: 14px;">
                <p v-html="textFommater(transProp(scope.row, thead.prop))"></p>
            </div>
            <div class="text-max-line" :style="{'-webkit-line-clamp': thead.maxLine || 3}" v-html="textFommater(transProp(scope.row, thead.prop))" style="text-align: left;"></div>
        </el-tooltip>
    </div>
    <div v-else-if="thead.type === 'tag'">
        <template v-for="(tag, index) in transProp(scope.row, thead.prop)">
            <el-tag :type="tagType(tag.taglevel)" v-if="tag.tagname" class="tag-item" @click="gotoTagManage(tag.tagname)" :key="index">{{tag.tagname}}</el-tag>
        </template>
    </div>
    <div v-else-if="thead.type === 'avatar'">
        <el-avatar :size="thead.size || 'medium'" :src="transProp(scope.row, thead.prop)"></el-avatar>
    </div>
    <div v-else-if="thead.type === 'media'">
        <div class="image-list-wrap" v-viewer="{movable: false}">
            <div class="image-item" v-for="(media, mindex) in transProp(scope.row, thead.prop)" :key="mindex">
                <img v-if="media.media_type === 2" :src="media.url" style="width: 80px; height: 80px;">
                <video-player v-if="media.media_type === 4" :src="media.url" :poster="media.thumb_url" :duration="media.video_play_len"></video-player>
            </div>
        </div>
    </div>
    <div v-else-if="thead.type === 'topic'">
        <el-tooltip v-for="(topic, index) in transProp(scope.row, thead.prop)" :key="index" class="item" effect="dark" placement="top">
            <div slot="content">{{topic.topic_type === 1 ? '文字话题' : 'POI话题'}}<br />TopicId: {{topic.topic_id}}</div>
            <el-tag class="tag-item" :type="topic.topic_type === 1 ? 'primary': 'info'">{{topic.topic}}</el-tag>
        </el-tooltip>
    </div>
    <div v-else-if="thead.type === 'poi'">
        <template v-if="transProp(scope.row, thead.prop).city">
            {{transProp(scope.row, thead.prop).city}} {{transProp(scope.row, thead.prop).poiAddress}} {{transProp(scope.row, thead.prop).poiName}}<br />
            经度：{{transProp(scope.row, thead.prop).longitude}}<br />
            纬度：{{transProp(scope.row, thead.prop).latitude}}
        </template>
    </div>
    <div v-else-if="thead.type === 'operationSlot'">
        <slot name="operationSlot" :row="scope.row" :index="scope.$index"></slot>
    </div>
    <div v-else-if="thead.type === 'slot'">
        <slot :name="thead.slot" :row="scope.row" :index="scope.$index"></slot>
    </div>
    <div v-else-if="thead.type === 'self'">
        <slot name="self" :row="scope.row" :index="scope.$index"></slot>
    </div>
    <div v-else-if="thead.type === 'trans'" v-html="transFilter(transProp(scope.row, thead.prop), thead.transList)">
        
    </div>
    <div v-else>{{transProp(scope.row, thead.prop)}}</div>
</el-table-column>