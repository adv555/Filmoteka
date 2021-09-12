import './sass/main.scss';
import './js/refs';
import './js/back-to-top-btn';
import MoviesApiService from './js/api/api-service';
import createGalleryMarkup from './js/gallery/gallery.js';
import 'material-icons';
import './js/changeTheme';
import filterFilm from './js/filter';
import './js/team-lightbox';
import './js/onSearch';
import './js/modal-card';
import './js/spinner';
import './js/filter/genres-filter';
import UpcomingCollectionEngine from './js/slider';
// import './js/filter/genres-filter';
import onHomeBtn from './js/header';
//=========== library test imports ============
// import onLibraryWachedBtm from './js/library';
// import onLibraryQueueBtn from './js/library';
import onLibraryBtn from './js/library';
import { defaults } from 'lodash';
// import onAddWachedBtm from './js/library';
// import onAddQueueBtn from './js/library';

//===============================================

// =========== filter
// filterFilm();

// =========== new class instance
const moviesApiService = new MoviesApiService();
export default moviesApiService;

// =========== render slider
const upcomingCollectionEngine = new UpcomingCollectionEngine();

moviesApiService.fetchUpcomingMovies().then(upcomingCollectionEngine.renderUpcomingMovies);
