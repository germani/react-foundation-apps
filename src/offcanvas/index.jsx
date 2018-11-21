var React = import('react');
var cx = import('react/lib/cx');
// var LayerMixin = import('react-layer-mixin');
var foundationApi = import('../utils/foundation-api');

var Offcanvas = React.createClass({
  // mixins: [LayerMixin],
  getInitialState: function () {
    return {open: false};
  },
  getDefaultProps: function () {
    return {
      position: 'left'
    };
  },
  componentDidMount: function () {
    foundationApi.subscribe(this.props.id, function (name, msg) {
      if (msg === 'open') {
        this.setState({open: true});
      } else if (msg === 'close') {
        this.setState({open: false});
      } else if (msg === 'toggle') {
        this.setState({open: !this.state.open});
      }
    }.bind(this));
  },
  componentWillUnmount: function () {
    foundationApi.unsubscribe(this.props.id);
  },
  render: function() {
    var classes = {
      'off-canvas': true,
      'is-active': this.state.open,
    };
    classes[this.props.position] = true;
    if (this.props.className) {
      classes[this.props.className] = true;
    }
    return (
      <div id={this.props.id} data-closable={true} className={cx(classes)}>
          {this.props.children}
      </div>
    );
  },
});

module.exports = Offcanvas;