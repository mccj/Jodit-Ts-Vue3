<template>
    <textarea ref="editorTab"></textarea>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Jodit } from 'jodit'
// import { MODE_WYSIWYG } from 'jodit/types/core/constants'
import 'jodit/build/jodit.min.css'

export default defineComponent({
    name: 'Jodit-Ts-Vue3',
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: String,
            required: false
        },
        editorOptions: {
            type: Object,
            required: false,
            default: () => {
                return {
                    language: navigator.language?.replace('-', '_')?.toLocaleLowerCase() ?? "auto",
                    // sourceEditorCDNUrlsJS: ['https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js'],
                    // beautifyHTMLCDNUrlsJS: [
                    //     'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify.min.js',
                    //     'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify-html.min.js'
                    // ],
                    // uploader: {
                    //     insertImageAsBase64URI: true,
                    //     // url: 'http://localhost:8181/index-test.php?action=fileUpload',
                    //     // format: 'json',
                    //     // headers: {
                    //     //     'X-CSRF-Token': 'token'
                    //     // }
                    //     // url: "http://192.168.2.26:8000/confknowledge/addZyFile"
                    //     url: "http://192.168.2.26:8000/confknowledge/addZyFile",
                    //     imagesExtensions: [
                    //         "jpg",
                    //         "png",
                    //         "jpeg",
                    //         "gif"
                    //     ],
                    //     //headers: {"token":`${db.token}`},
                    //     // filesVariableName: 'files',
                    //     filesVariableName: function (t) { return "files[" + t + "]" },
                    //     // withCredentials: false,
                    //     // pathVariableName: "path",
                    //     // format: "json",
                    //     // method: "POST",
                    //     prepareData: function (formdata) {
                    //         console.log(formdata)
                    //         let file = formdata.getAll("files[0]")[0];
                    //         //formdata.append("createTime", (Date.now() / 1000) | 0);
                    //         formdata.append("file", file);
                    //         return formdata;
                    //     },
                    //     isSuccess: function (e) {
                    //         // console.log("shuju"+e.data);
                    //         return e.data;
                    //     },
                    //     getMessage: function (e) {
                    //         return void 0 !== e.data.messages && Array.isArray(e.data.messages) ? e.data.messages.join("") : ""
                    //     },
                    //     process: function (resp) {
                    //         var ss = this;
                    //         console.log(resp);
                    //         var arrfile = [];
                    //         //arrfile.push(resp.data);
                    //         arrfile.unshift(resp.data);
                    //         this.path = arrfile[0];
                    //         return {
                    //             file: arrfile, //[this.options.uploader.filesVariableName] || [],
                    //             path: arrfile[0],
                    //             baseurl: '',
                    //             error: resp.msg,
                    //             msg: resp.msg,
                    //             isImages: arrfile[0]
                    //         };
                    //         //return resp.data;
                    //     },
                    //     // error: function (e) {
                    //     //     // this.jodit.events.fire("errorMessage", e.message, "error", 4e3)
                    //     // },
                    //     defaultHandlerSuccess: function (data, resp) {
                    //         this.s.insertImage(data.baseurl + data['isImages']);
                    //         // console.log(data,resp)
                    //         // var i, field = 'files';
                    //         //     for (i = 0; i < data[file].length; i += 1) {
                    //         //         this.s.insertImage(data.baseurl + data[file][i]);
                    //         //     }
                    //     },
                    //     defaultHandlerError: function (e) {
                    //         this.jodit.events.fire("errorMessage", e.message)
                    //     },
                    //     // contentType: function (e) {
                    //     //     return (void 0 === this.jodit.ownerWindow.FormData || "string" == typeof e) &&
                    //     //         "application/x-www-form-urlencoded; charset=UTF-8"
                    //     // }
                    // },
                    // filebrowser: {
                    //     // saveStateInStorage: false,
                    //     saveStateInStorage: {
                    //         storeLastOpenedFolder: false
                    //     },
                    //     ajax: {
                    //         url: 'http://localhost:8181/index-test.php'
                    //     },
                    //     uploader: {
                    //         url: 'uploader.php',
                    //         format: 'json',
                    //         filesVariableName: 'fils'
                    //         //... all options from [uploader](http://xdsoft.net/jodit/doc/Jodit.defaultOptions.html#uploader)
                    //     }
                    // },
                    // height: 200,
                    // theme: 'dark',//summer
                    // textIcons: false,
                    // iframe: false,
                    // iframeStyle: '*,.jodit_wysiwyg {color:red;}',
                    // height: 'auto',
                    // minHeight: 400,
                    // maxHeight: 600,
                    defaultMode: 'MODE_SOURCE',//MODE_WYSIWYG、MODE_SOURCE
                    // imageDefaultWidth: '100%',
                    // observer: {
                    //     timeout: 100
                    // },
                    // commandToHotkeys: {
                    //     'openreplacedialog': 'ctrl+p'
                    // },
                }
            }
        },
    },
    setup(props, ctx) {
        let editorTab = ref<HTMLElement>();
        let editor: Jodit | null = null;

        const editorConfig = computed(() => {
            const config = { ...props.editorOptions }
            return config
        })

        onMounted(() => {
            editor = Jodit.make(editorTab.value!, editorConfig.value)
            editor.value = props.modelValue ?? ""
            editor.events.on('change', newValue => ctx.emit('update:modelValue', newValue))
        });
        onBeforeUnmount(() => {
            editor?.destruct()
        })
        return { editorTab }
    }
});
</script>