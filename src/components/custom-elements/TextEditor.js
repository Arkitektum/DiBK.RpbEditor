import { Editor } from '@tinymce/tinymce-react';
import { tinymceContentCss, tinymceContentUiCss } from 'utils/tinymce-bootstrapper';

const cssOverride = 'body { font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans"; font-size: 14px }';

const TextEditor = ({ value, name, onChange }) => {
   const handleEditorChange = content => {
      onChange({ target: { value: content, name, type: 'editor' } });
   };

   return (
      <Editor
         value={value}
         onEditorChange={(_, editor) => {
            handleEditorChange(editor.getContent());
         }}
         init={{
            height: 300,
            menubar: false,
            nonbreaking_force_tab: true,       
            paste_data_images: true,
            paste_as_text: true,
            plugins: ['lists link image imagetools charmap code fullscreen paste nonbreaking'],
            toolbar: 'undo redo | bold italic | bullist numlist outdent indent | image charmap | fullscreen',
            skin: false,
            content_css: false,
            content_style: [tinymceContentCss, tinymceContentUiCss, cssOverride].join('\n'),            
            setup: editor => {
               editor.on('focus', event => {
                  const container = event.target.targetElm.nextSibling;
                  container.classList.add('focused');
               });

               editor.on('blur', event => {
                  const container = event.target.targetElm.nextSibling;
                  container.classList.remove('focused');
               });
            }
         }}
      />
   );
}

export default TextEditor;
