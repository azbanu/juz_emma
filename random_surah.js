    $(document).ready(function() {
	 const surahs = [78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98, 99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114];
	 const ayats = [40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
      
	 
	 $('#generate_id').click(function(){
	 
	 // generate randon surah
	 let index_surah = Math.floor(Math.random() * 38);
	 let selected_index = $('#surah_option').val();
	 if (selected_index != '-1' )
	 {
	     index_surah = selected_index;
	 }
	let surah_number = surahs[index_surah];	 
	 
	 // generate randon ayah
	 const num_of_ayahs = ayats[index_surah];
	 const randon_ayah_number = Math.floor((Math.random() * num_of_ayahs) + 1);	 
	 
	 $('#gen_answer_id').hide()
	 $.ajax({
          url: "https://api.quran.com/api/v3/chapters/"+surah_number+"/verses/"+randon_ayah_number,
          type: "GET",
          success: function(response) {
		  console.log(response);
		  $('#ayah_id').text(response.verse.text_madani);
		 
          },
          error: function(error) {
            console.log(error);
          }
        });
		
        if (surah_number == 114 && randon_ayah_number ==  6 ) // no next ayah 
		 {  
		     $('#gen_answer_id').text("End of Juz Amma") ;
			 return;
		 }		

		let next_ayah_number = randon_ayah_number+1;	 
		 
		 if (randon_ayah_number == num_of_ayahs )
		 {  
		    surah_number = surahs[(parseInt(index_surah)+1)];
			next_ayah_number = 1;
		 }
		
		 let next_surah_ayah_number_text = " (" + surah_number + ":" + next_ayah_number + ")";
	  
		$.ajax({
          url: "https://api.quran.com/api/v3/chapters/"+surah_number+"/verses/"+ next_ayah_number,
          type: "GET",
          success: function(response) {
		  console.log(response);
		  $('#gen_answer_id').text(response.verse.text_madani + next_surah_ayah_number_text) ;
		 
          },
          error: function(error) {
            console.log(error);
          }
        });
		
		
	 });
	 
	 
	 $('#next_surah_id').click(function(){
     let index_surah = Math.floor(Math.random() * 38);
	 let num_of_ayahs = ayats[index_surah];
	 let question = "";
	 let answer = "";
	$('#answer_id').hide()
	 $.ajax({
          url: "https://api.quran.com/api/v3/chapters/"+surahs[index_surah]+"/verses/"+num_of_ayahs,
          type: "GET",
          success: function(response) {
		  console.log(response);
		  $('#question_text_id').text(response.verse.text_madani);
		 
          },
          error: function(error) {
            console.log(error);
          }
        });
	
	 
	 if (surahs[index_surah] == 114)
		 {  
	      $('#answer_id').text("End of Juz Amma") ;
			 return;
		 }
	
	 $.ajax({
          url: "https://api.quran.com/api/v3/chapters/"+surahs[index_surah+1]+"/verses/1",
          type: "GET",
          success: function(response) {
		  console.log(response);
		  $('#answer_id').text(response.verse.text_madani);
          },
           error: function(error) {
            console.log(error);
          }
        });
	 });
	 
      });
