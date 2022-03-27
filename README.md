# VisualSorting

Visual representation, with auidio effect of the most common sorting algorithms written in pure javascript and HTML.

You can test it out [here](https://dev-null.me/)

[![image](https://user-images.githubusercontent.com/50732964/160263362-be4d4874-3232-4dcf-892d-dca9e07bfae4.png)](https://dev-null.me/)


## Available algorithms

### Tim sort:
 - starts with insertion sort for smaller parts (32 pieces)
 - merge sort for parts created by insertion stage

### Insertion sort
 - binary search in the sorted segment and then insertion on the correct position

### Selection sort
 - selects the smallest element and puts at the end of the sorted segment

### Quicksort
 - chose random pivot (element from array)
   move everything smaller to the left of the pivot and everything larger to the right
 - repeat for the right part and left part separated by the pivot

### Merge sort
 - merge increasingly bigger array parts starting at 1
   using 2 moving pivots

### Bubble sort
 - compare each element with the next one if the next one is smaller swap them

### Random sort
 - randomly shuffle array and hope for the best :D

### Stalin sort
 - delete each element that is not bigger than the previous one

### LSD/MSD Radix sort
  - LSD/MSD (Least/Most Significant Digit)
  - Separate data into digits
  - for each value create bucket and move all values with according value on current digit to that bucket repeat
  - PS: MSD works better since the numbers are represented as floats with a lot of digits
