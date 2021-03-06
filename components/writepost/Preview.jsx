import React, { Component } from 'react';
import MarkdownIt from 'markdown-it'
import markdownCenterText from 'markdown-it-center-text'
import markdownVideo from 'markdown-it-video'
const md = new MarkdownIt({
    html: false
}).use(markdownCenterText)
    .use(markdownVideo, {
        youtube: { width: '100%', height: 300 },
        vimeo: { width: 500, height: 281 },
        vine: { width: 600, height: 600, embed: 'simple' },
        prezi: { width: 550, height: 400 }
    })

class Preview extends Component {
    state = {
        head: true
    }
    render() {
        const { preview, body } = this.props
        const { head } = this.state
        return (
            <div className={`column is-5-desktop is-10-tablet is-full-mobile ${preview ? '' : 'is-hidden-touch'}`}>
                <div className="card article">
                    <div className="card-content">
                        <button id="toggle-header" onClick={() => this.setState({ head: !this.state.head })}
                            className={`button ${this.state.head ? 'is-warning' : 'is-success'}`}>
                            <span className="icon">
                                {this.state.head ? <i className="fas fa-window-minimize"></i> : <i className="far fa-window-maximize"></i>}
                            </span>
                        </button>
                        {this.state.head ? this.props.children : ''}
                        <div dangerouslySetInnerHTML={{ __html: md.render(body) }} className="content article-body markdown-body">
                        </div>
                    </div>
                </div>
                <style jsx>{`
                .article {
                        margin-top: 3rem;
                    }
                    .markdown-body{
                        height: ${head ? 'auto' : '80vh'};
                        overflow: ${head ? 'auto' : 'scroll'};
                    }
                    #toggle-header{
                        position: absolute;
                        top: 1rem;
                        left: 1rem;
                    }
                    `}</style>
            </div>
        );
    }
}

export default Preview;
