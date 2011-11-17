//#!/usr/bin/env node

var fs = require('fs'),
    exec = require('child_process').exec,
    path = require('path');

/*
* lesswatch usage:
* 
* `lesswatch` to watch the current directory
* OR
* `lesswatch path/to/dir` to watch a directory
* OR
* `lesswatch path/to/dir1 path/to/dir2` to watch two (or more) directories
*/

/**
* Compile a .less file to a .css file
*/
function compile(file, outfile) {
	if(typeof(outfile) !== 'string') {
        outfile = file.substr(0, file.length - 5) + '.css';
        var pathParts = outfile.split('/');
        outfile = path.join('..', 'css', pathParts[pathParts.length - 1]);
        console.log(outfile);
    }
	exec('lessc ' + file + ' -x', function(error, stdout, stderr){
		if(error) {
			console.error('ERROR compiling ' + file);
			console.error(stderr);
		} else {
			fs.writeFile(outfile, stdout);
			console.log('Compiled ' + file);
		}
	});
}

function watchDir(path) {
	var files = fs.readdirSync(path);
	var prefix = path === '.' ? '' : (path + '/');
	for(var i in files) {
		var file = prefix + files[i];
		if(fs.statSync(file).isDirectory()) {
			// watch subdirectories recursively
			watchDir(file);
		} else {
			if(file.substr(-5) === '.less') {
				compile(file);
				fs.watch(file, function(fn){ return function(curr, prev){
					if(+curr.mtime !== +prev.mtime) {
						compile(fn);
					}
				}; }(file));
			}
		}
	}
}

/*************************/

var dirs = ['.'];
var args = process.argv.slice(2);
if(args.length > 0) dirs = args;

for(var i in dirs) {
	watchDir(dirs[i]);
}