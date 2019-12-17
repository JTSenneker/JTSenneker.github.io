import {
	Group,
	Loader,
	LoadingManager
} from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/102/three.js';

export class FBXLoader extends Loader {

	constructor(manager?: LoadingManager);

	load(url: string, onLoad: (object: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
	parse(FBXBuffer: ArrayBuffer | string, path: string): Group;

}
