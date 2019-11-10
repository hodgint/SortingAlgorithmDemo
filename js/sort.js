var sort = (function(){

    /*
    * Returns the difference between
    * two elements in the given array
    * Inputs: 
    * - arr: an array of numbers
    * - i: first element to compare
    * - j: second element to compare
    */
    function compare(arr, i, j){
        return arr[i] - arr[j];
    }

    /*
    * Swaps two elements in the given array
    * Inputs:
    * - arr: an array of numbers
    * - i: first element to swap
    * - j: second element to swap
    */
    function swap(arr, i, j){
        var temp = arr[i];
        arr[i] = arr[j]
        arr[j] = temp;
    }
    /* 
    * Sorts given array using bubble sort
    * -arr: an array of numbers
    */
   function bubbleSort(arr) {
        var size = arr.length();
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size - i - 1; j++){
                if(compare(arr,j+1, j) < 0){
                    swap(arr, j, j+1);
                }
            }
        }
    }
})