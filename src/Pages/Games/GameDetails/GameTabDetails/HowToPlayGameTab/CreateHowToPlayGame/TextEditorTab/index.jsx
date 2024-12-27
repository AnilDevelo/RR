import React from "react";
import TextEditor from "../../../../../../Master/Document/TextEditor";

const TextEditorTab = ({ formData, setFormData }) => {

    const handleEditor = (props)=>{
        setFormData({
            ...formData,
            value: props
        })
    };



    return(
        <>
            <div className={'text-editor-details-section'}>
                <div className={'mt_margin'}>
                    <TextEditor
                        handleChange={handleEditor}
                        value={formData?.value}
                        classNameProps={'how_to_play_game'}
                    />
                </div>
            </div>
        </>
    )
}
export default TextEditorTab