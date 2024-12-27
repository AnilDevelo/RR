import "react-quill/dist/quill.snow.css";
import React from "react";
import ReactQuill from "react-quill";

const TextEditor = ({value, handleChange, isDisabled, classNameProps}) => {
    // const uploadImageCallBack = (file) => {
    //     return new Promise(
    //         (resolve, reject) => {
    //             const fileData = new FormData();
    //             fileData.append('documentationImage', file)
    //             dispatch(documentationUploadImages(fileData)).then(res => {
    //                 if (res.data.success) {
    //                     resolve({ data: { link: res.data.data.imageLink } });
    //                 }
    //             }).catch(err => {
    //                 reject(err.message);
    //                 handleOpenModal('ErrorPop', { header: "Error", body: err.message })
    //             });
    //         }
    //     );
    // }
    return(
        <>
            <div className="text-editor">
                <ReactQuill
                    theme="snow"
                    value={value}
                    className={classNameProps}
                    onChange={(e)=> handleChange(e)}
                    modules = {
                        {
                            toolbar: [
                                ['bold', 'italic', 'underline', 'strike','link'],        // toggled buttons
                                ['blockquote', 'code-block'],
                                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                                [{ 'direction': 'rtl' }],                         // text direction

                                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                                [{ 'font': [] }],
                                [{ 'align': [] }],
                                ['image','clean']                                         // remove formatting button
                            ]
                        }
                    }

                    disabled ={isDisabled}
                />
            </div>
        </>
    )
}

export default TextEditor