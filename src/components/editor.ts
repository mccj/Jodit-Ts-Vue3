import JoditEditor from './JoditEditor.vue';
export default {
    install: (app: import("vue").App<any>) => {
        app.component('jodit-editor', JoditEditor);
    },

}
export { JoditEditor }
export { Jodit } from 'jodit'