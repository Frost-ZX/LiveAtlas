import {CircleMarkerOptions, PathOptions, PointTuple, PolylineOptions} from "leaflet";
import {CoordinatesControlOptions} from "@/leaflet/control/CoordinatesControl";
import {LogoControlOptions} from "@/leaflet/control/LogoControl";
import {ClockControlOptions} from "@/leaflet/control/ClockControl";

declare global {
	interface Window {
		config: DynmapConfig;
		hideSplash: Function;
	}
}

type DynmapConfig = {
	url: DynmapUrlConfig;
};

type DynmapUrlConfig = {
	configuration: string;
	update: string;
	sendmessage: string;
	login: string;
	register: string;
	tiles: string;
	markers: string;
}

interface DynmapServerConfig {
	version: string;
	allowChat: boolean;
	chatRequiresLogin: boolean;
	chatInterval: number;
	defaultMap?: string;
	defaultWorld?: string;
	defaultZoom: number;
	followMap?: string;
	followZoom: number;
	updateInterval: number;
	showLayerControl: boolean;
	title: string;
	loginEnabled: boolean;
	loginRequired: boolean;
	maxPlayers: number;
	hash: number;
}

interface DynmapMessageConfig {
	chatNotAllowed: string;
	chatRequiresLogin: string;
	chatCooldown: string;
	mapTypes: string;
	players: string;
	playerJoin: string;
	playerQuit: string;
	anonymousJoin: string;
	anonymousQuit: string;
}

interface DynmapComponentConfig {
	markers: DynmapMarkersConfig;
	playerMarkers?: DynmapPlayerMarkersConfig;
	coordinatesControl?: CoordinatesControlOptions;
	clockControl ?: ClockControlOptions;
	linkControl: boolean;
	logoControls: Array<LogoControlOptions>;
}

interface DynmapMarkersConfig {
	showLabels: boolean
}

interface DynmapPlayerMarkersConfig {
	hideByDefault: boolean;
	layerName: string;
	layerPriority: number;
	showBodies: boolean;
	showSkinFaces: boolean;
	showHealth: boolean;
	smallFaces: boolean;
}

interface DynmapWorld {
	seaLevel: number;
	name: string;
	protected: boolean;
	title: string;
	height: number;
	center: Coordinate;
	maps: Map<String, DynmapMap>;
}

interface DynmapMap {
	world: DynmapWorld;
	background: string;
	backgroundDay: string;
	backgroundNight: string;
	compassView: string;
	icon: string;
	imageFormat: string;
	name: string;
	nightAndDay: boolean;
	prefix: string;
	protected: boolean;
	title: string;
	type: string;
	mapToWorld: [number, number, number, number, number, number, number, number, number];
	worldToMap: [number, number, number, number, number, number, number, number, number];
	nativeZoomLevels: number;
	extraZoomLevels: number;
}

interface DynmapWorldState {
	raining: boolean;
	thundering: boolean;
	timeOfDay: number;
}

interface Coordinate {
	x: number;
	y: number;
	z: number;
}

interface DynmapLocation {
	x: number;
	y: number;
	z: number;
	world?: string;
}

interface DynmapConfigurationResponse {
	config: DynmapServerConfig,
	messages: DynmapMessageConfig,
	worlds: Array<DynmapWorld>,
	components: DynmapComponentConfig,
}

interface DynmapUpdateResponse {
	worldState: DynmapWorldState;
	configHash: number;
	playerCount: number;
	players: Set<DynmapPlayer>;
	updates: DynmapUpdates;
	timestamp: number;
}

interface DynmapPlayer {
	account: string
	armor: number
	health: number
	name: string
	sort: number
	location: DynmapLocation;
}

interface DynmapMarkerSet {
	id: string,
	label: string;
	hidden: boolean;
	priority: number;
	minZoom?: number;
	maxZoom?: number;
	showLabels?: boolean;
	markers: Map<string, DynmapMarker>;
	areas: Map<string, DynmapArea>;
	lines: Map<string, DynmapLine>;
	circles: Map<string, DynmapCircle>;
}

interface DynmapMarker {
	dimensions: PointTuple;
	icon: string;
	label: string;
	isHTML: boolean;
	location: Coordinate;
	minZoom?: number;
	maxZoom?: number;
	popupContent?: string;
}

interface DynmapArea {
	style: PolylineOptions;
	label: string;
	isHTML: boolean;
	x: Array<number>;
	y: PointTuple;
	z: Array<number>;
	minZoom?: number;
	maxZoom?: number;
	popupContent?: string;
}

interface DynmapLine {
	x: Array<number>;
	y: Array<number>;
	z: Array<number>;
	style: PolylineOptions;
	label: string;
	isHTML: boolean;
	minZoom?: number;
	maxZoom?: number;
	popupContent?: string;
}

interface DynmapCircle {
	location: Coordinate;
	radius: PointTuple;
	style: PathOptions;
	label: string;
	isHTML: boolean;
	minZoom?: number;
	maxZoom?: number;
	popupContent?: string;
}

interface DynmapUpdates {
	markerSets: Map<string, DynmapMarkerSetUpdates>,
	tiles: Map<string, number>,
	chat: Array<any> //TODO
}

interface DynmapMarkerSetUpdates {
	markerUpdates: Array<DynmapMarkerUpdate>
	areaUpdates: Array<DynmapAreaUpdate>
	circleUpdates: Array<DynmapCircleUpdate>
	lineUpdates: Array<DynmapLineUpdate>
}

interface DynmapUpdate {
	id: string,
	removed: boolean,
	payload?: any,
}

interface DynmapMarkerUpdate extends DynmapUpdate {
	payload?: DynmapMarker
}

interface DynmapAreaUpdate extends DynmapUpdate {
	payload?: DynmapArea
}

interface DynmapCircleUpdate extends DynmapUpdate {
	payload?: DynmapCircle
}

interface DynmapLineUpdate extends DynmapUpdate {
	payload?: DynmapLine
}