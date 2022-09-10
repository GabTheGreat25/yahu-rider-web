import { Component, Input, OnInit } from "@angular/core";
import { environment as env } from "../../../../environments/environment";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  constructor() {}
  @Input() center: google.maps.LatLngLiteral = env.DEFAULT_COORDS;
  options: google.maps.MapOptions = {
    mapTypeId: "roadmap",
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  zoom = 12;

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = position
        ? {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        : this.center;
    });
  }
}
