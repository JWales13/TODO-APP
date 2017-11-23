$(document).ready(readyNow);

function readyNow(){
    console.log('JQ');
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


//get response clears the table and reloads with updated
function getResponse(response) {
    $('#viewTaskList').empty(); //clears table
    for( var i = 0; i < response.length; i++){
        var listedTask = response[i];
        var $newTask = $('<tr><td>' + listedTask.task + '</td>' + '<td>' + listedTask.status + '</td></tr>');//appends all objects in array
        var $deleteTaskButton = $('<button class="deleteButton">Delete</button>');//defines delete button

        
        $deleteTaskButton.data('id', listedTask.id);//attaches delete button to object it appears next to
        $newTask.append($deleteTaskButton);//append delete button when new object is added
        $('#viewTaskList').append($newTask); //appends new object

        var $updateStatusButton = $('<button class="updateStatus">Mark Complete</button>');//defines update buttons
        $newTask.append($updateStatusButton); //appends button
        $updateStatusButton.data('id', listedTask.id); //attaches button to object it is appended to
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
    console.log('in saveTask', newTask);
    // ajax call to server to get tasks
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
    console.log('remove task clicked! the koala removed had an id of', taskIdToRemove);
  
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


  