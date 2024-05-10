
function NoteTemplate(initialNote, editMode) {


    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <style>
          :focus {
            outline: none;
          }

          #title {
            font-weight: normal;
            color: red;
            font-size: 1.5rem;
          }   
          img{
            height:12rem;
            width:auto;
            border-radius:10px;
            filter:drop-shadow(2px 2px 10px gray);
            user-select: none;
          }
        </style>
        <body>
          <section 
            contenteditable=${editMode}
            id='title'
          >
            ${initialNote.title}
          </section>
          <hr />  
          <br /> 
          <section 
            contenteditable=${editMode}
            id='content'
          >
            ${initialNote.content}
          </section>
        </body>
      </html>
    `;

  return htmlContent;
}

export default NoteTemplate;
