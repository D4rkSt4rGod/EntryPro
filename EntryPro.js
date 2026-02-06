// Entry Pro Blocks v2.0
// Based on NPI Structure


// ============================================
// IMPORTANT: Core Functions (DO NOT MODIFY)
// ============================================


// 1. Entry Static Blocks Definition (Not required)
Entry.staticBlocks = [

    {

        category: 'start',
        blocks: [

            'when_run_button_click',

            'when_some_key_pressed',

            'mouse_clicked',

            'mouse_click_cancled',

            'when_object_click',

            'when_object_click_canceled',

            'when_message_cast',

            'message_cast',

            'message_cast_wait',

            'when_scene_start',

            'start_scene',

            'start_neighbor_scene',

            'check_object_property',

            'check_block_execution',

            'switch_scope',

            'is_answer_submited',

            'check_lecture_goal',

            'check_variable_by_name',

            'show_prompt',

            'check_goal_success',

            'positive_number',

            'negative_number',

            'wildcard_string',

            'wildcard_boolean',

            'register_score',

        ],
    },

    {
        category: 'flow',
        blocks: [

            'wait_second',

            'repeat_basic',

            'repeat_inf',

            'repeat_while_true',

            'stop_repeat',

            '_if',

            'if_else',

            'wait_until_true',

            'stop_object',

            'restart_project',

            'when_clone_start',

            'create_clone',

            'delete_clone',

            'remove_all_clones',

        ],
    },

    {
        category: 'moving',
        blocks: [

            'move_direction',

            'bounce_wall',

            'move_x',

            'move_y',

            'move_xy_time',

            'locate_x',

            'locate_y',

            'locate_xy',

            'locate_xy_time',

            'locate',

            'locate_object_time',

            'rotate_relative',

            'direction_relative',

            'rotate_by_time',

            'direction_relative_duration',

            'rotate_absolute',

            'direction_absolute',

            'see_angle_object',

            'move_to_angle',

        ],
    },

    {
        category: 'looks',
        blocks: [

            'show',

            'hide',

            'dialog_time',

            'dialog',

            'remove_dialog',

            'change_to_some_shape',

            'change_to_next_shape',

            'add_effect_amount',

            'change_effect_amount',

            'erase_all_effects',

            'change_scale_size',

            'set_scale_size',

            'flip_x',

            'flip_y',

            'change_object_index',

        ],
    },

    {
        category: 'brush',
        blocks: [

            'brush_stamp',

            'start_drawing',

            'stop_drawing',

            'set_color',

            'set_random_color',

            'change_thickness',

            'set_thickness',

            'change_brush_transparency',

            'set_brush_tranparency',

            'brush_erase_all',

        ],
    },

    {
        category: 'text',
        blocks: ['text_blue', 'text_orange', 'text_Yello', 'text_gray ', 'text_flush'],
    },

    {
        category: 'sound',
        blocks: [

            'sound_something_with_block',

            'sound_something_second_with_block',

            'sound_from_to',

            'sound_something_wait_with_block',

            'sound_something_second_wait_with_block',

            'sound_from_to_and_wait',

            'sound_volume_change',

            'sound_volume_set',

            'sound_silent_all',

        ],
    },

    {

        category: 'judgement',
        blocks: [

            'is_clicked',

            'is_press_some_key',

            'reach_something',

            'boolean_basic_operator',

            'boolean_and_or',

            'boolean_not',

        ],
    },

    {
        category: 'calc',
        blocks: [

            'calc_basic',

            'calc_rand',

            'coordinate_mouse',

            'coordinate_object',

            'get_sound_volume',

            'quotient_and_mod',

            'calc_operation',

            'get_project_timer_value',

            'choose_project_timer_action',

            'set_visible_project_timer',

            'get_date',

            'distance_something',

            'get_sound_duration',

            'get_user_name',

            'length_of_string',

            'combine_something',

            'char_at',

            'substring',

            'index_of_string',

            'replace_string',

            'change_string_case',

        ],
    },

    {
        category: 'variable',
        blocks: [

            'variableAddButton',

            'listAddButton',

            'ask_and_wait',

            'get_canvas_input_value',

            'set_visible_answer',

            'get_variable',

            'change_variable',

            'set_variable',

            'show_variable',

            'hide_variable',

            'value_of_index_from_list',

            'add_value_to_list',

            'remove_value_from_list',

            'insert_value_to_list',

            'change_value_list_index',

            'length_of_list',

            'is_included_in_list',

            'show_list',

            'hide_list',

        ],
    },

    {
        category: 'func',
        blocks: ['functionAddButton'],
    },

    {
        category: 'analysis',
        blocks: [

            'analizyDataAddButton',

            'append_row_to_table',

            'insert_row_to_table',

            'delete_row_from_table',

            'set_value_from_table',

            'get_table_count',

            'get_value_from_table',

            'calc_values_from_table',

            'open_table_chart',

            'close_table_chart',

        ],
    },

    {
        category: 'ai_utilize',
        blocks: [

            'aiUtilizeBlockAddButton',

            'aiUtilizeModelTrainButton',

            'audio_title',

            'check_microphone',

            'speech_to_text_convert',

            'speech_to_text_get_value',

            'get_microphone_volume',

            'tts_title',

            'read_text',

            'read_text_wait_with_block',

            'set_tts_property',

            'translate_title',

            'get_translated_string',

            'check_language',

            'video_title',

            'video_draw_webcam',

            'video_check_webcam',

            'video_flip_camera',

            'video_set_camera_opacity_option',

            'video_motion_value',

            'video_toggle_model',

            'video_is_model_loaded',

            'video_number_detect',

            'video_toggle_ind',

            'video_body_part_coord',

            'video_face_part_coord',

            'video_detected_face_info',

        ],
    },

    {
        category: 'expansion',
        blocks: [

            'expansionBlockAddButton',

            'weather_title',

            'check_weather',

            'check_finedust',

            'get_weather_data',

            'get_current_weather_data',

            'get_today_temperature',

            'check_city_weather',

            'check_city_finedust',

            'get_city_weather_data',

            'get_current_city_weather_data',

            'get_today_city_temperature',

            'festival_title',

            'count_festival',

            'get_festival_info',

            'behaviorConductDisaster_title',

            'count_disaster_behavior',

            'get_disaster_behavior',

            'behaviorConductLifeSafety_title',

            'count_lifeSafety_behavior',

            'get_lifeSafety_behavior',

        ],
    },

    {
        category: 'arduino',
        blocks: [

            'arduino_reconnect',

            'arduino_open',

            'arduino_cloud_pc_open',

            'arduino_connect',

            'arduino_download_connector',

            'download_guide',

            'arduino_download_source',

            'arduino_noti',

        ].concat(EntryStatic.DynamicHardwareBlocks),
    }

];

// 2. Get All Blocks (Not required)
EntryStatic.getAllBlocks = () => {
    return Entry.staticBlocks;
}

// 3. Update Category
const updateCategory = (category, options) => {

    Entry.playground.mainWorkspace.blockMenu._generateCategoryView([

        { category: 'start', visible: true },

        { category: 'flow', visible: true },

        { category: 'moving', visible: true },

        { category: 'looks', visible: true },

        { category: category, visible: false },

        { category: 'brush', visible: true },

        { category: 'text', visible: true },

        { category: 'sound', visible: true },

        { category: 'judgement', visible: true },

        { category: 'calc', visible: true },

        { category: 'variable', visible: true },

        { category: 'func', visible: true },

        { category: 'analysis', visible: true },

        { category: 'ai_utilize', visible: true },

        { category: 'expansion', visible: true },

        { category: 'arduino', visible: false }

    ]);


    for (let i = 0; i < $('.entryCategoryElementWorkspace').length; i++) {
        if ($('.entryCategoryElementWorkspace').eq(i).attr('id') !== 'entryCategorytext') {
            $('.entryCategoryElementWorkspace').eq(i).attr('class', 'entryCategoryElementWorkspace');
        }
    }

    Entry.playground.blockMenu._categoryData = EntryStatic.getAllBlocks();
    Entry.playground.blockMenu._generateCategoryCode(category);

    if (options) {
        if (options.background) {
            $(`#entryCategory${category}`).css('background-image', 'url(' + options.background + ')');
            $(`#entryCategory${category}`).css('background-repeat', 'no-repeat');
            if (options.backgroundSize) {
                $(`#entryCategory${category}`).css('background-size', options.backgroundSize + 'px');
            }
        }
        if (options.name) {
            $(`#entryCategory${category}`)[0].innerText = options.name;
        }
    }
};

// 4. Add Block Function (Core)
/**
 * 
 * @param {*} blockname = blockIdentifier
 * 
 * @param {*} template = (textBlock: %1) or (valueBlock: viewBlockText) or (executeBlock: viewBlockText) %(num): input
 * 
 * @param {*} color = { color:(blockFillColor), outerLine:(blockOuterLineColor) }
 * 
 * @param {*} params = (textBlock: params: [ {type: 'Text', text: 'ViewText', color: EntryStatic.colorSet.common.TEXT, class: bold, align: 'center' or (delete align)}) or (valueBlock params: []) or (executeBlock params: [])
 * 
 * @param {*} _class = CSS class
 * 
 * @param {*} func = Execution function
 * 
 * @param {*} skeleton = Block type (basic, basic_string_field, etc.)
 */
const addBlock = (blockname, template, color, params, _class, func, skeleton = 'basic') => {

    Entry.block[blockname] = {

        color: color.color,

        outerLine: color.outerline,

        fontColor: color.fontColor,

        skeleton: skeleton,

        statement: [],

        params: params.params,

        events: {},

        def: {

            params: params.def,

            type: blockname

        },

        paramsKeyMap: params.map,

        class: _class ? _class : 'default',

        func: func,

        template: template

    }

}

// 5. Library Creator
const LibraryCreator = {

    start: (blocksJSON, category, text) => {

        let blockArray = new Array;

        // Get LibraryCreator

    }

}


// ============================================
// Entry Pro Configuration
// ============================================


// 1. color definition
const EntryProColors = {
    red: 'rgba(255, 0, 0, 1)',
    orange: 'rgba(225, 136, 52, 1)',
    blue: 'rgb(35, 94, 177)',
    violet: 'rgb(160, 72, 192)',
    weakViolet: 'rgb(115, 108, 142)',
    mint: 'rgb(33, 195, 200)',
    green: 'rgb(59, 174, 92)',
    pink: 'rgb(174, 82, 116)',
    brown: 'rgb(135, 87, 24)',
    strBlue: 'rgb(28, 60, 166)',
    purple: 'rgb(92, 8, 98)',
    black: 'rgb(0, 0, 0)',
    briBlue: 'rgb(22, 78, 210)',
    strGreen: 'rgb(20, 75, 50)',
    deepBrown: 'rgb(100, 7, 40)',
    white: 'rgba(255, 255, 255, 1)',
    invisable: 'rgba(255, 255, 255, 0)',
    deepBlueHafInvis: 'rgba(21, 59, 112, 0.471)',
    deepVioletHafInvis: 'rgba(160, 72, 192, 0.467)',
    grayHafInvis: 'rgba(115, 108, 142, 0.573)',
}

const EntryProVersion = '0.1.0';


// ============================================
// Entry Pro additional Blocks
// ============================================


addBlock('entryPro_titleEmptyBlock', '%1', {

    color: EntryStatic.colorSet.common.TRANSPARENT,

    outerLine: EntryStatic.colorSet.common.TRANSPARENT

}, {

    params: [

        {

            type: 'Text',

            text: '',

            color: EntryStatic.colorSet.common.TEXT,

            class: 'bold',

        }

    ],

    def: [],

    map: []

}, 'title','basic_text',)

addBlock('entryPro_titleText', '%1', {

    color: EntryStatic.colorSet.common.TRANSPARENT,

    outerLine: EntryStatic.colorSet.common.TRANSPARENT

}, {

    params: [

        {

            type: 'Text',

            text: 'Entry Pro Blocks v.' + EntryProVersion + '',

            color: EntryStatic.colorSet.common.TEXT,

            class: 'bold',

            align: 'right'

        }

    ],

    def: [],

    map: []

}, 'title', 'basic_text',)

addBlock('entryPro_groupConsole', '%1', {

    color: EntryStatic.colorSet.common.TRANSPARENT,

    outerLine: EntryStatic.colorSet.common.TRANSPARENT

}, {

    params: [

        {

            type: 'Text',

            text: 'Console',

            color: EntryStatic.colorSet.common.TEXT,

            class: 'bold',

            align: 'center'

        }

    ],

    def: [],

    map: {}

}, 'groupConsole', 'basic_text',)

addBlock('entryPro_browserConsoleLog', '브라우저 콘솔에 %1을(를) 출력하기 %2', {
    color: '#4B8BF4',
    outerLine: '#2E5AA6'
}, {
    params: [
        {
            type: 'Block',
            accept: 'string'
        },
        {
            type: 'Indicator',
            img: 'block_icon/start_icon.svg',
            size: 11
        }
    ],
    def: [
        {
            type: 'text',
            params: ['메시지']
        },
        null
    ],
    map: {
        MESSAGE: 0,
    }
}, 'groupConsole', function(sprite, script) {
    const message = script.getValue('MESSAGE', script);
    console.log(`${message}`);
    return script.callReturn();
});

addBlock('entryPro_browserConsoleGroup', '브라우저 콘솔에 %1을(를) 그룹으로 출력하기 %2', {
    color: '#4B8BF4',
    outerLine: '#2E5AA6'
}, {
    params: [
        {
            type: 'Block',
            accept: 'string'
        },
        {
            type: 'Indicator',
            img: 'block_icon/start_icon.svg',
            size: 11
        }
    ],
    def: [
        {
            type: 'text',
            params: ['그룹1']
        },
        null
    ],
    map: {
        MESSAGE: 0,
    }
}, 'groupConsole', function(sprite, script) {
    const message = script.getValue('MESSAGE', script);
    console.group(`${message}`);
    return script.callReturn();
});

addBlock('entryPro_browserConsoleGroupEnd', '브라우저 콘솔에 열려있는 그룹을 닫기 %1', {
    color: '#4B8BF4',
    outerLine: '#2E5AA6'
}, {
    params: [
        {
            type: 'Indicator',
            img: 'block_icon/start_icon.svg',
            size: 11
        }
    ],
    def: [null],
    map: {}
}, 'groupConsole', function(sprite, script) {
    console.groupEnd();
    return script.callReturn();
});

addBlock('entryPro_browserConsoleClear', '브라우저 콘솔을 초기화 하기%1', {
    color: '#4B8BF4',
    outerLine: '#2E5AA6'
}, {
    params: [
        {
            type: 'Indicator',
            img: 'block_icon/start_icon.svg',
            size: 11
        }
    ],
    def: [],
    map: {}
}, 'groupConsole', function(sprite, script) {
    console.clear();
    return script.callReturn();
});

addBlock('entryPro_groupProject', '%1', {

    color: EntryStatic.colorSet.common.TRANSPARENT,

    outerLine: EntryStatic.colorSet.common.TRANSPARENT

}, {

    params: [

        {

            type: 'Text',

            text: 'Project',

            color: EntryStatic.colorSet.common.TEXT,

            class: 'bold',

            align: 'center'

        }

    ],

    def: [],

    map: {}

}, 'groupProject', 'basic_text',)

addBlock('entryPro_projectNameValue', '작품 이름', {

    color: '#242424ff',

    outerline: '#000000ff',

}, {

    params: [],

    def: [],

    map: {},

}, 'groupProject', async (sprite, script) => {

    return Entry.projectName;

}, 'basic_string_field');

addBlock('entryPro_projectIdValue', '작품 아이디', {

    color: '#242424ff',

    outerline: '#000000ff',

}, {

    params: [],

    def: [],

    map: {},

}, 'groupProject', async (sprite, script) => {

    return Entry.projectId;

}, 'basic_string_field');

addBlock('entryPro_projectSceneCountValue', '작품에 사용된 장면 수', {

    color: '#242424ff',

    outerline: '#000000ff',

}, {

    params: [],

    def: [],

    map: {},

}, 'groupProject', async (sprite, script) => {

    const sceneCount = Entry.scene.getScenes().length;

    return sceneCount;

}, 'basic_string_field');

addBlock('entryPro_projectObjectCountValue', '작품에 사용된 오브젝트 수', {

    color: '#242424ff',

    outerline: '#000000ff',

}, {

    params: [],

    def: [],

    map: {},

}, 'groupProject', async (sprite, script) => {

    const objectCount = Entry.container.getAllObjects().length;

    return objectCount;

}, 'basic_string_field');


// 나중에 추가할 기능 줄바꿈 상수 Entry.variableContainer.getVariableByName('변수이름').value_ = '\n'

// ============================================
// Entry Pro Initialization
// ============================================


Entry.staticBlocks.push({

    category: 'EntryPro', blocks: [
        'entryPro_titleEmptyBlock',
        'entryPro_titleText',
        'entryPro_titleEmptyBlock',
        'entryPro_groupConsole',
        'entryPro_browserConsoleLog',
        'entryPro_browserConsoleGroup',
        'entryPro_browserConsoleGroupEnd',
        'entryPro_browserConsoleClear',
        'entryPro_groupProject',
        'entryPro_projectNameValue',
        'entryPro_projectIdValue',
        'entryPro_projectSceneCountValue',
        'entryPro_projectObjectCountValue',
    ]

});

updateCategory('EntryPro')


// ============================================
// Entry Pro Category Styling
// ============================================


$('head').append(`<style> #entryCategoryEntryPro 

{ background-image: url(/lib/entry-js/images/robot.svg);

 background-repeat: no-repeat; 

 border-bottom-right-radius: 6px; 

 border-bottom-left-radius: 6px; 

 margin-bottom: 1px; 

 } .entrySelectedCategory#entryCategoryEntryPro

  { background-image: url(/lib/entry-js/images/robot_on.svg);

background-color: #3ed6c1ff;

border-color: #000000ff;

color: #ffffffff;


}

    } </style>

`)

$('#entryCategoryEntryPro').text('EntryPro')