'use strict';

var React = require('react');
var Dialog = require('rc-dialog');
var div;

module.exports = function (props) {
  var d;
  props = props || {};
  props.iconClassName = props.iconClassName || 'anticon-exclamation-circle';
  var width = props.width || 375;

  function close() {
    d.setState({
      visible: false
    });
  }

  function onCancel() {
    var cancelFn = props.onCancel;
    if (cancelFn) {
      var ret;
      if (cancelFn.length) {
        ret = cancelFn(close);
      } else {
        ret = cancelFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  function onOk() {
    var okFn = props.onOk;
    if (okFn) {
      var ret;
      if (okFn.length) {
        ret = okFn(close);
      } else {
        ret = okFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  var body = React.createElement(
    'div',
    { className: 'ant-confirm-body' },
    React.createElement('i', { className: 'anticon ' + props.iconClassName }),
    React.createElement(
      'span',
      { className: 'ant-confirm-title' },
      props.title
    ),
    React.createElement(
      'div',
      { className: 'ant-confirm-content' },
      props.content
    )
  );
  var footer = React.createElement(
    'div',
    { className: 'ant-confirm-btns' },
    React.createElement(
      'button',
      { type: 'button', className: 'ant-btn-default ant-btn ant-btn-lg', onClick: onCancel },
      '取 消'
    ),
    React.createElement(
      'button',
      { type: 'button', className: 'ant-btn-primary ant-btn ant-btn-lg', onClick: onOk },
      '确 定'
    )
  );

  if (!div) {
    div = document.createElement('div');
    document.body.appendChild(div);
  }

  React.render(React.createElement(
    Dialog,
    {
      prefixCls: 'ant-modal',
      className: 'ant-confirm',
      renderToBody: false,
      visible: true,
      closable: false,
      title: '',
      transitionName: 'zoom',
      maskTransitionName: 'fade', width: width },
    React.createElement(
      'div',
      { style: { zoom: 1, overflow: 'hidden' } },
      body,
      ' ',
      footer
    )
  ), div, function () {
    d = this;
  });
};