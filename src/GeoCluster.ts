/* tslint:disable:no-import-side-effect no-namespace no-shadowed-variable */
import { DocumentData, GeoPoint } from "@google-cloud/firestore";
import { GeoFirestoreTypes} from "./GeoFirestoreTypes";
import '@types/node';
import {computeCentroid} from "./utils"


export class GeoCluster implements GeoFirestoreTypes.Document  {

  g: string;
  l: GeoPoint;
  d?: DocumentData;
  p?: number;
  s?: number

  constructor(g: string, l: GeoPoint, d?: DocumentData, s?: number) {
    this.g = g;
    this.l = l;
    this.p = g.length;
    d? this.d=d : this.d=null;
    s? this.s=s : this.s=null;
  }

  compute( coordinatesArray : [GeoPoint, number][]){

    let centroid:{
      latitude:  number;
      longitude: number } = {
        latitude: this.l.latitude,
        longitude: this.l.longitude
    }

    coordinatesArray.forEach(element => {
      centroid = computeCentroid( element[0], centroid, this.s, element[1]);
      this.s = this.s + element[1];
    })

    this.l = new GeoPoint(centroid.latitude, centroid.longitude);
  }


}

