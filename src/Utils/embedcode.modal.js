import React, { Component } from 'react';
import '../App.css';

class EmbedCodeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            event_url: '',
            event_gallery_url: '',
            iframe_width: '',
            iframe_height: '',
            custom_width: 550,
            custom_height: 350,
        };
    }

    componentDidUpdate(prevProps) {

        console.log("componentDidUpdate props", this.props);
        if (this.props !== prevProps) {
            const proppss = this.props;
            console.log("props", this.props);
            // const event_url = `https://${proppss.eventUrl}.illusnap.com`;
            // const event_gallery_url = `https://${proppss.eventUrl}.illusnap.com/photo-gallery`;
            this.setState({
                eventName: proppss.evName,
                event_url: proppss.ev_url,
                event_gallery_url: proppss.ev_gallery_url,
                iframe_width: 700,
                iframe_height: 425,
            });
        }
    }

    handleFrameSize = (event) => {
        console.log("handleFrameSize", event.target.value, event.target.id);
        switch (event.target.id) {
            case "large":
                this.setState({
                    iframe_width: 700,
                    iframe_height: 425
                })
                return;
            case "mid":
                this.setState({
                    iframe_width: 550,
                    iframe_height: 350
                })
                return;
            case "small":
                this.setState({
                    iframe_width: 400,
                    iframe_height: 250
                })
                return;
            case "iframe-custom-width":
                this.setState({
                    iframe_width: event.target.value,
                    custom_width: event.target.value
                })
                return;
            case "iframe-custom-height":
                this.setState({
                    iframe_height: event.target.value,
                    custom_height: event.target.value
                })
                return;
            default:
                this.setState({
                    iframe_width: this.state.custom_width,
                    iframe_height: this.state.custom_height
                })
                return;
        }
    }

    render() {
        const { eventName,
            event_url, event_gallery_url,
            iframe_width, iframe_height,
            custom_width, custom_height,
        } = this.state;
        return (
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="eventsEmbedtitle">Embed Event : {eventName} </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" onClick={this.closeEdit}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="event-embed-layout" >
                            <div className="event-option-box">
                                <div className="af-embed-options">
                                    <h3>Options</h3>
                                    <div className="af-form-group af-embed-group">
                                        <h4>Size :</h4>
                                        <div className="af-embed-size-group" onChange={this.handleFrameSize}>
                                            <div className="af-embed-size-option">
                                                <input type="radio" id="embed-iframe-size-large" value="700,425" id="large" name="embed-iframe-size" defaultChecked />
                                                <label for="embed-iframe-size-large">700 x 425</label>
                                            </div>
                                            <div className="af-embed-size-option">
                                                <input type="radio" id="embed-iframe-size-mid" value="550,350" id="mid" name="embed-iframe-size" />
                                                <label for="embed-iframe-size-mid">550 x 350</label>
                                            </div>
                                            <div className="af-embed-size-option">
                                                <input type="radio" id="embed-iframe-size-small" value="400,250" id="small" name="embed-iframe-size" />
                                                <label for="embed-iframe-size-small">400 x 250</label>
                                            </div>
                                            <div className="af-embed-size-option">
                                                <input type="radio" id="iframe-custom-radio" value="550,350" id="custom" name="embed-iframe-size" />
                                                <div className="af-embed-custom-group">
                                                    <input id="iframe-custom-width" className="af-input  embed-font-input" type="number" min="10" max="4096" value={custom_width} /><span> x </span>
                                                    <input id="iframe-custom-height" className="af-input embed-font-input" type="number" min="10" max="4096" value={custom_height} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="event-embed-tab-box">
                                <h2>HOW TO EMBED</h2>
                                <h5>Copy the embed code below and paste it into your HTML file.</h5>
                                <div className="embed-tab">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">For Event</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">For Gallery</a>
                                        </li>
                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                            <p>
                                                <textarea
                                                    class="af-textarea form-control af-embed-code-textarea"
                                                    value={`<iframe style="width:${iframe_width}px;height:${iframe_height}px" src="${event_url}" seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" allow="camera"></iframe>`}
                                                    readonly
                                                />
                                            </p>
                                            <p>
                                                <textarea
                                                    class="af-textarea form-control af-embed-code-textarea"
                                                    value={event_url}
                                                    readonly
                                                />
                                            </p>
                                        </div>
                                        <div class="tab-pane" id="tabs-2" role="tabpanel">
                                            <p>
                                                <textarea
                                                    class="af-textarea form-control af-embed-code-textarea"
                                                    value={`<iframe style="width:${iframe_width}px;height:${iframe_height}px" src="${event_gallery_url}" seamless="seamless" scrolling="yes" frameborder="0" allowtransparency="false" allowfullscreen="true"></iframe>`}
                                                    readonly
                                                />
                                                 

                                            </p>
                                            <p>
                                                <textarea
                                                    class="af-textarea form-control af-embed-code-textarea"
                                                    value={event_gallery_url}
                                                    readonly
                                                />
                                                 </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default EmbedCodeModal;