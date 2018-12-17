// All Custom JS


// Basic Notes
// App currently uses the restart function from 'lib-responsive/js/quiz.js' for replacing right arrow after quiz completion. 
// fa-caret-right once the user completes the quiz. This function calls app.nextSlide. The restart event 
// also changes the passResult property in the quizStore object below line 15. is located in lib-repsonsive/js/quiz.js method restart line 725.

(function(){



	// Audio effect functions
	var audioA = new Audio('js/sound-g.wav');
	var audioB = new Audio('js/sound-e.wav');
	audioA.volume = 0.20;
	audioB.volume = 0.55;

	function play(whatSound) {
	    if (whatSound.paused) {
	        whatSound.play();
	    }else{
	        whatSound.currentTime = 0;
	    }
	}

	// App functionality object
	window.app = {

		// Possible quiz result store for serverside trigger
		quizStore: {
			id: '',
			course: '',
			// false === fail until true is set to refer to pass
			passResult: false
		},

		//Track courses with no quiz to set passResult via noQuizPass method
		noQuizCourses: ['1', '2', '2a', '3', '3a', '5'],

		watchState: function(){

			//Watches for the quiz pages and instructions page to slide in. 
			// Uses/refs the data-state attribute on the html. 
			
			//i.e in that case would need to reveal right icon. 
			Reveal.addEventListener( 'quizSection', function() {

					    $('.fa-arrow-circle-right').hide();
					  
					    $('.fa-arrow-circle-left').click(function(){
							$('.fa-arrow-circle-right').show();		    	
					    });

			}, false ); //Event listener ends	

		},

		videoUi: function(){
			// Event code for video play button event
			// Watch for video state / found in data-state="video" on all video
			// slide parent 'section elememts'.
			Reveal.addEventListener( 'video', function() {

				// Hide the right arrow when video slide appears/loads
				  $('.fa-arrow-circle-right').hide();

				// If user clicks back to the previous slide, show the right arrow
				  $('.fa-arrow-circle-left').click(function(){
				  $('.fa-arrow-circle-right').fadeIn(1000);          
				  });

				// Video button click event listener, once played, show the right arrow allowing the user to progress
				  $( ".vjs-big-play-button" ).click(function() {
				    $('.fa-arrow-circle-right').fadeIn(1000); 
				  });

				//Failsafe for when actual video is played - Right Arrow will appear if user has been
				//in different places. 
				  $('video').bind('play', function (e) {
				  	$('.fa-arrow-circle-right').fadeIn(1000); 
				  });

			}, false ); //video slide event listener ends

		},

		noQuizPass: function(coursesArray){

			//Grab course id and get course number value from data attribute
			var grabbit = document.getElementById('course');
			var nodeObj = grabbit.dataset.course;

			//Check if course number from data in html is one of the no-quiz courses
			var arrayContainsCourse = (coursesArray.indexOf(nodeObj) > -1);

			if (arrayContainsCourse) {
				//change pass result to false to courses with no quizes
				app.quizStore.passResult = true;
			}

		},

		nextSlide: function(){
			Reveal.next();

			//Variable that checks if next slide is a video, for after quiz test cases.
			//state variable === slides current data-state 
			var state = Reveal.getCurrentSlide().dataset.state;

			//If next slide is a video, right button is hidden, else it is shown
			if (state === 'video') {
				$('.fa-arrow-circle-right').hide();
			} else {
				$('.fa-arrow-circle-right').fadeIn(1000);
			}
			
		},

		revealStart: function () {

			var revealObject = Reveal.initialize({

			    // Display controls in the bottom right corner
			    controls: false,

			    // Display a presentation progress bar
			    progress: true,

			    // Display the page number of the current slide
			    slideNumber: false,

			    // Push each slide change to the browser history
			    history: false,

			    // Enable keyboard shortcuts for navigation
			    keyboard: false,

			    // Enable the slide overview mode
			    overview: false,

			    // Vertical centering of slides
			    center: true,

			    // Enables touch navigation on devices with touch input
			    touch: true,

			    // Loop the presentation
			    loop: false,

			    // Change the presentation direction to be RTL
			    rtl: false,

			    // Randomizes the order of slides each time the presentation loads
			    shuffle: false,

			    // Turns fragments on and off globally
			    fragments: true,

			    // Flags if the presentation is running in an embedded mode,
			    // i.e. contained within a limited portion of the screen
			    embedded: false,

			    // Flags if we should show a help overlay when the questionmark
			    // key is pressed
			    help: true,

			    // Flags if speaker notes should be visible to all viewers
			    showNotes: false,

			    // Number of milliseconds between automatically proceeding to the
			    // next slide, disabled when set to 0, this value can be overwritten
			    // by using a data-autoslide attribute on your slides
			    autoSlide: 0,

			    // Stop auto-sliding after user input
			    autoSlideStoppable: true,

			    // Use this method for navigation when auto-sliding
			    autoSlideMethod: Reveal.navigateNext,

			    // Enable slide navigation via mouse wheel
			    mouseWheel: false,

			    // Hides the address bar on mobile devices
			    hideAddressBar: true,

			    // Opens links in an iframe preview overlay
			    previewLinks: false,

			    // Transition style
			    transition: 'slide', // none/fade/slide/convex/concave/zoom

			    // Transition speed
			    transitionSpeed: 'slow', // default/fast/slow

			    // Transition style for full page slide backgrounds
			    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

			    // Number of slides away from the current that are visible
			    viewDistance: 3,

			    // Parallax background image
			    parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

			    // Parallax background size
			    parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

			    // Number of pixels to move the parallax background per slide
			    // - Calculated automatically unless specified
			    // - Set to 0 to disable movement along an axis
			    parallaxBackgroundHorizontal: null,
			    parallaxBackgroundVertical: null,

			    // The "normal" size of the presentation, aspect ratio will be preserved
			    // when the presentation is scaled to fit different resolutions. Can be
			    // specified using percentage units.
			    width: "100%",
			    height: "100%",

			    // Factor of the display size that should remain empty around the content
			    margin: 0.1,

			    // Bounds for smallest/largest possible scale to apply to content
			    minScale: 0.2,
			    maxScale: 1.5

			});

			return revealObject;

		},

		userTracking: function(url, element){

			// Get Id from url path string
			var getUserId = function(url) { 

				var urlParams = url.split("="); 
				var userId = urlParams[1]; 

				return userId;
			};

			app.quizStore.id = getUserId(url);

			//References html5 data attribute on the body tag
			var getCourseId = function(element){
				// 'Getting' data-attributes using getAttribute
				var course = document.getElementById(element);
				var courseIdValue = course.getAttribute('data-course'); 
				return courseIdValue;
			};

			app.quizStore.course = getCourseId(element);


		},

		finishServerEvent: function(){

			app.userTracking(window.location.href, 'course');

			//Redirect user on course submits
			window.location = 'http://mycestaging.reinz.co.nz/course/completeExternalTraining/?id=' + app.quizStore.id;

			// //Display object in alert foy server
			// var stringTheObj = JSON.stringify(app.quizStore);
			// alert('Time for some ajax to send the following object to the server: ' + stringTheObj + 
			// 	' I am triggered from the method found in custom.js:-----> called app.finishServerEvent.');
		},

		navigationWatchers: function(){

			// Navigation for triggering UI removal and watch state methods.
			$('.navigate-right').click(function(){
				//Initialize ui for video slides
				app.videoUi();
				//Watches for quiz state and changes left right arrow ui
				app.watchState();	
				play(audioA);
			});

			$('.navigate-left').click(function(){
				play(audioB);
				//Left click navigation will always reveal the right click navigation
				$('.fa-arrow-circle-right').show();
			});

		},

		init: function(){

				//Load reveal object
				app.revealStart();

				//Ui navigation event listeners
				app.navigationWatchers();

			    //Check for no quiz courses and change the pass object
			   	app.noQuizPass(app.noQuizCourses);


			    //Click event for course completion
			    document.getElementById('finish').onclick = function() { 
					app.finishServerEvent();		      
			    };	

			    //Removes the pulse css class from the nav right arrow after the first slide. 
			    Reveal.addEventListener( 'pulsa', function() {
			        $('#nRight').removeClass('pulse');
			    }, false ); //Event listener ends

			    //prevent body overflow and scrolling on iPad
			    if(isiPad){
			        $("body").css("overflow","hidden");
			        $("body").css("position","fixed");
			    }


		}

	}; //app ends

	app.init(); //Initialize app



}()); //iffe ends











