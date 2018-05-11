const Funnel = require('broccoli-funnel');
const LiveReload = require('broccoli-livereload');
const merge = require('broccoli-merge-trees');
const debug = require('./auto/debug');

const trees = [
  debug(new Funnel('src', { include: ['**/*.js'] }), 'javascript'),
  debug(new Funnel('src', { include: ['**/*.css'] }), 'stylesheets'),
  debug(new Funnel('src', { include: ['index.html'] }), 'index')
];

const merged = debug(merge(trees, { overwrite: true }), 'merged');

module.exports = process.env.RELOAD ? new LiveReload(merged, { target: 'index.html' }) : merged;
