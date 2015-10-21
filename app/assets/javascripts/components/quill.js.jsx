var RichText = React.createClass({
  componentDidMount: function() {
      this.editor = new Quill('#editor', { modules: {
       'toolbar': { container: '#toolbar' },
       'image-tooltip': true,
       'link-tooltip': true
        }, theme: 'snow'
      });

      this.editor.on('text-change', this.handleChange);

      if (this.props.update) {
        debugger;
        this.editor.setContents(this.props.body);
      }
    },

  handleChange: function () {
    var body = JSON.stringify(this.editor.getContents());
    this.props.handleBodyChange.call(null, body);
  },

  componentWillReceiveProps: function (newProps) {
    if (typeof newProps.body !== "string") {
      this.editor.setContents(newProps.body);
    }
  },

   render: function() {
     return (
       <div>
         <div className="quill-wrapper">
           <div className="toolbar-container">
               <div id="toolbar" className="toolbar ql-toolbar ql-snow">
                   <span className="ql-format-group">
                       <select title="Size" className="ql-size" >
                           <option value="10px">Small</option>
                           <option value="13px" defaultValue="">Normal</option>
                           <option value="18px">Large</option>
                           <option value="32px">Huge</option>
                       </select>
                   </span>

                   <span className="ql-format-group">
                     <span title="Bold" className="ql-format-button ql-bold"></span>
                     <span className="ql-format-separator"></span>
                     <span title="Italic" className="ql-format-button ql-italic"></span>
                     <span className="ql-format-separator"></span>
                     <span title="Underline" className="ql-format-button ql-underline"></span>
                     <span className="ql-format-separator"></span>
                     <span title="Strikethrough" className="ql-format-button ql-strike"></span>
                   </span>

                   <span className="ql-format-group">
                     <span title="List" className="ql-format-button ql-list" id="ql-list"></span>
                     <span className="ql-format-separator"></span>
                     <span title="Bullet" className="ql-format-button ql-bullet" id="ql-bullet"></span>
                   </span>

                   <span className="ql-format-group">
                     <select title="Text Alignment" className="ql-align">
                         <option value="left" label="Left" defaultValue=""></option>
                         <option value="center" label="Center"></option>
                         <option value="right" label="Right"></option>
                         <option value="justify" label="Justify"></option>
                     </select>
                   </span>

                   <span className="ql-format-group">
                     <span title="Image" className="ql-format-button ql-image"></span>
                     <span title="Link" className="ql-format-button ql-link"></span>
                   </span>
               </div>
           </div>

           <div className="editor-container">
               <div id="editor" className="editor ql-container ql-snow">
                   <div className="ql-editor authorship" id="ql-editor-2" contentEditable="true"></div>
                   <div className="ql-paste-manager" contentEditable="true"></div>
               </div>
           </div>
         </div>
       </div>
     );
   }
});
