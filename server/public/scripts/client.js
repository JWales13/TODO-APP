$(document).ready(readyNow);

function readyNow(){
    getTasks();
    $('.submitTask').on('click', addANewTask);
    $('#viewTaskList').on('click', '.deleteButton', removeTask);
    $('#viewTaskList').on('click', '.updateStatus', updateStatus)    
    
}//end readynow


function addANewTask(){
    var listedTask = {
        task: $('.inputTask').val(),
        status: 'not complete'
    }
    saveTask(listedTask);
};



function getResponse(response) {
    $('#viewTaskList').empty(); 
    for( var i = 0; i < response.length; i++){
        var listedTask = response[i];
        var $newTask = $('<tr><td>' + listedTask.task + '</td>' + '<td>' + listedTask.status + '</td></tr>');
        var $deleteTaskButton = $('<button class="deleteButton">Delete</button>');

        
        $deleteTaskButton.data('id', listedTask.id);
        $newTask.append($deleteTaskButton);
        $('#viewTaskList').append($newTask); 

        var $updateStatusButton = $('<button class="updateStatus">Mark Complete</button>');
        $newTask.append($updateStatusButton); 
        $updateStatusButton.data('id', listedTask.id); 
    }
}


function getTasks (){
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function(response){
            getResponse(response);   
        }
    })
};

function saveTask(newTask){

    $.ajax({
      url: '/tasks',
      type: 'POST',
      data: newTask,
      success: function( data ){
        console.log( 'got some tasks: ', data );
        $('input').val('');
        getTasks();
      } // end success
    }); //end ajax
  }

  function removeTask (){
    console.log($(this).data());
    var taskIdToRemove = $(this).data().id;
    
  
    $.ajax({
      method: 'DELETE',
      url: '/tasks/' + taskIdToRemove,
      success: function(response){
        getTasks();
      }//end success
    })//end ajax delete
  }//end removeTask

  function updateStatus(){
    var taskIdToUpdate = $(this).data().id;
  
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + taskIdToUpdate,
        data: {status: 'completed'},
        success: function (response){
            $('#viewTaskList').empty();
            getTasks();
        }//end success
    })//end ajax put
  }//end updateStatus


  