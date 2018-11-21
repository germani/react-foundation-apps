var React = import('react');
var foundationApi = import('../utils/foundation-api');
var cloneWithProps = import('react/lib/cloneWithProps');

var PopupToggle = React.createClass({
  clickHandler: function (id, e) {
    e.preventDefault();
    foundationApi.publish(this.props.popupToggle, ['toggle', id]);
  },
  render: function () {
    var child = React.Children.only(this.props.children);
    var id = this.props.id || foundationApi.generateUuid();
    return cloneWithProps(child, {
      id: id,
      onClick: this.clickHandler.bind(this, id)
    });
  }
});

module.exports = PopupToggle;