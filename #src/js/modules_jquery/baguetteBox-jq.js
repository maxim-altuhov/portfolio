import baguetteBox from 'baguettebox.js';

function galleryBoxJq() {

	// Jquery
	if ($('.gallery').length > 0) {
		baguetteBox.run('.gallery', {
			// Custom options
		});
	}


}

export default galleryBoxJq;