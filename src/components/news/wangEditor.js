// @ts-nocheck
import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
export default function WangEditor(props) {
    const {content} = props
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('') // 编辑器内容
    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
            props.htmlData(html)
    }, [html,props])
   
    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
    }
    editorConfig.onBlur = (editor) => {
        setHtml(editor.getHtml())
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <div>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={content?content:html}
                onCreated={setEditor}
                mode="default"
                style={{ height: 'auto', overflow: 'hidden' }}
            />
        </div>
    )
}
