import React from 'react';
import ReactDOM from 'react-dom';

// Require Editor CSS files.
import 'froala-editor/css/  .min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

//import plugin
import 'froala-editor/js/plugins.pkgd.min.js';

class Editor extends React.Component {

  constructor(){
    super();
    this.state = {
      model: 'here is description',
    }
    this.handleModelChange = this.handleModelChange.bind(this);
  }
  handleModelChange = (model) => {
    console.log(model);
    this.setState({model});
  }
  render() {
    return (
      <FroalaEditorComponent 
        model={this.state.model}
        onModelChange={this.handleModelChange}
        tag='textarea'
        config={{
          placeholderText: 'Edit Your Content Here!',
          charCounterCount: false,
          toolbarSticky: true,
          toolbarButtons: {
            moreText: {
              // List of buttons used in the  group.
              buttons: ['bold', 'italic', 'underline', 
              'strikeThrough', 'subscript', 'superscript', 
              'fontFamily', 'fontSize', 'textColor', 
              'backgroundColor', 'inlineClass', 'inlineStyle', 
              'clearFormatting'],
        
              // Alignment of the group in the toolbar.
              align: 'left',
        
              // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
              buttonsVisible: 3
            },

            moreParagraph: {
              buttons: ['alignLeft', 'alignCenter', 'formatOLSimple',
              'alignRight', 'alignJustify', 'formatOL',
              'formatUL', 'paragraphFormat', 'paragraphStyle',
              'lineHeight', 'outdent', 'indent', 'quote'],
              align: 'left',
              buttonsVisible: 3
            },

            moreRich: {
              buttons: ['insertLink', 'insertImage', 'insertVideo', 
              'insertTable', 'emoticons', 'fontAwesome', 
              'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
              align: 'left',
              buttonsVisible: 3
            },        

            moreMisc: {
              buttons: ['undo', 'redo', 'fullscreen', 
              'print', 'getPDF', 'spellChecker', 
              'selectAll', 'html', 'help'],
              align: 'right',
              buttonsVisible: 3
            }
          },
          videoUpload: false,
          imageManagerLoadURL: '/file/load_images',
          imageManagerDeleteURL: '/file',
          imageManagerDeleteMethod: 'DELETE',
          imageUploadParam: 'image_param',
          imageUploadURL: '/file/upload_image',
          imageUploadMethod: 'POST',
          imageMaxSize: 5 * 1024 * 1024,
          imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        }}
      />
    );
  }
}

ReactDOM.render(
  <Editor/>,
  document.getElementById('root')
);
