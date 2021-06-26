
        // Lancement de la page quand le DOM est chargé
    
  window.addEventListener("DOMContentLoaded", init, false);
      
      var coca = {};
      coca.tweet = {};
      coca.tweet.data = {};
      var xhr = null;
      var test;
      coca.tweet.cont = "true";
      //Fonction init qui lance les variables
      function init(){
      register_tweet();
      show_tweet();
      update_tweet();
      count_length();
      coca.tweet.getXMLHttpRequest();
      coca.timer = setInterval(function(){coca.tweet.get_tweet()}, 1500);
    }

    //Initialisation
      coca.tweet.getXMLHttpRequest = function(){  
        if (window.XMLHttpRequest || window.ActiveXObject) {
          if (window.ActiveXObject) {
            try {
              xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
          } else {
            xhr = new XMLHttpRequest(); 
          }
        } else {
          alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
          return null;
        }
        return xhr;

      }

      //Va chercher la requête

      coca.tweet.get_tweet = function(callback){
        xhr = coca.tweet.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            coca.tweet.callback_get_tweet(xhr.responseText);
          }
        };
        xhr.open("GET.html", "php/count_length.json", true);
        xhr.send(null);

      }
      // Va retourner la donnée
      coca.tweet.callback_get_tweet = function(sData){
        coca.tweet.data = eval('(' + sData + ')');
        // console.log(coca.tweet.data);
        coca.tweet.display_tweet();


      }
      //récupération de la donnée avec condition pour stop certains timeout
      coca.tweet.display_tweet = function(){
        console.log(coca.tweet.data);
        if(coca.tweet.data >= 400){
                coca.tweet.cont = "false";
        }
        else{
        }
      }



    //Function qui charge toute les 15 secondes pour insérer les nouveaux tweets
    function register_tweet()
    {
         
         $.ajax({
          url: 'php/register_tweet.php',
    
        });
         setTimeout('register_tweet()',2000);      
    

    }

    //Function qui charge toute les X secondes pour récupérer les tweets

 
    function show_tweet()
    {
      console.log(coca.tweet.cont);
      if(coca.tweet.cont == "false"){
            $.ajax({
            url: 'php/show_tweet.php',
            success: function(data)
            {
              if(data!=0)
              {

                $('#tweetInTheBottle').show();
                $('#tweetInTheBottle').html(data);
              }
            }
          });
      }
      else{
      $.ajax({
        url: 'php/show_tweet.php',
        success: function(data)
        {
          if(data!=0)
          {

            $('#tweetInTheBottle').show();
            $('#tweetInTheBottle').html(data);
          }
        }
      });
      
      setTimeout('show_tweet()',2500);
      }
    }
    // Passe les twets à 1 donc pas d'anim pour les placer

    function update_tweet(){
      $.ajax({
        url: 'php/update_tweet.php',
        success: function(data)
        {
        }
      })
      setTimeout('update_tweet()',3800);
     }
 
     //récupère le nombre de tweet
function count_length()
{
  if(coca.tweet.cont == "false"){
  $.ajax({
  url: 'php/count_length2.php',
  success: function(data)
  {
      if(data!=0)
    {
      $('#conteurTweet').show();
      $('#conteurTweet').html(data);
    }
  }
  });
  }
  else{
  $.ajax({
  url: 'php/count_length2.php',
  success: function(data)
  {
  if(data!=0)
    {
    $('#conteurTweet').show();
    $('#conteurTweet').html(data);
    }
    }
  });
  setTimeout('count_length()',2000);
  } 
}
