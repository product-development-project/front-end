import React from 'react';

const Boilerplate = ({ taskName, type }) => {
    let boilerplateCode = '';
    const typeIdToName = {
        1: 'Integer manipulation',
        2: 'Array manipulation',
        3: 'Date manipulation',
        4: 'Nested array manipulation',
        5: 'String manipulation',
        6: 'Linked-list manipulation',
        7: 'Regular Expression'
    };

    const typeName = typeIdToName[type];
    console.log(typeName)
    switch (typeName) {
        case 'Integer manipulation':
            if (taskName === 'BeautifulNumbers') {
                boilerplateCode = `input = input()\nx, k = map(int, input.split())`;
                break;
            }
            else if (taskName === 'BrickDimensions') {
                boilerplateCode = `input = input()\na, b, c, w, h = map(int, input.split())`;
                break;
            }
            else if (taskName === 'MaximumBitwise' || taskName === 'NumberInRange') {
                boilerplateCode = `input = input()\nl, r, k = map(int, input.split())`;
                break;
            } else {
                boilerplateCode = `input = input()\nn = int(input)`;
                break; 
            }
        case 'Array manipulation':
            console.log(taskName);
            if (taskName === 'SumCombinations') {
                boilerplateCode = `input = input()\nvalues = input.split(',')\ncoins = [int(x) for x in values[0].split()]\nsum = int(values[1])`;
                break;
            } else if (taskName === 'SubarraySum') {
                boilerplateCode = `input = input()\nvalues = input.split(',')\nA = [int(x) for x in values[0].split()]\nS = int(values[1])`;
                break;
            } else {
                boilerplateCode = `input = input()\narray = [int(x) for x in input.split()]`;
                break;
            }
        case 'Date manipulation':
            boilerplateCode =
`def get_days(date1, date2):
    # finish code
\ninput = input()\ndate1, date2 = input.split()`;
            break;
        case 'Nested array manipulation':
            boilerplateCode = `input = input()\nnested_array = eval(input)`;
            break;
        case 'String manipulation':
            if (taskName === 'SmallestWindow') {
                boilerplateCode = `input = input()\nS, P = input.split()`;
                break;
            } 
            else if (taskName === 'MultiplyStrings') {
                boilerplateCode = `input = input()\nnum1, num2 = input.split()`;
                break;
            }
            else if (taskName === 'CaeserCipher') {
                boilerplateCode = `input = input()\nstr, rotation = input.split(',')\nrotation = int(rotation)`;
                break;
            } else {
                boilerplateCode = `str = input()`;
                break;
            }

        case 'Linked-list manipulation':
            if (taskName === 'LinkedListMerge') {
                boilerplateCode =
`from typing import List

class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next
                
def create_linked_list(nums: List[int]) -> ListNode:
  head = ListNode()
  curr = head
  for num in nums:
    curr.next = ListNode(num)
    curr = curr.next
  return head.next
                
def create_linked_lists(lists: List[List[int]]) -> List[ListNode]:
  return [create_linked_list(lst) for lst in lists]
                
def print_linked_list(head: ListNode) -> List[int]:
  values = []
  while head:
    values.append(head.val)
    head = head.next
  return values
                
def mergeKLists(lists: List[ListNode]) -> ListNode:
  # finish the code
                
input = input()
input_list = eval(input)
linked_lists = create_linked_lists(input_list)
merged_list = mergeKLists(linked_lists)
print(print_linked_list(merged_list))`;
                break; 
            }
            else if (taskName === 'LinkedListNode') {
                boilerplateCode = 
`from typing import List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
def create_linked_list(input_str):
    vals = input_str.split()
    head = ListNode(int(vals[0]))
    curr = head
    for val in vals[1:]:
        curr.next = ListNode(int(val))
        curr = curr.next
    return head

def print_linked_list(head: ListNode) -> List[int]:
    values = []
    while head:
      values.append(head.val)
      head = head.next
    return values

def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    # finish code

input = input()
input_list = input.split(',')
head = create_linked_list(input_list[0])
k = int(input_list[1])
reversed_list = reverseKGroup(head, k)
print(print_linked_list(reversed_list))`;
                break;
            }
        case 'Regular Expression':
            boilerplateCode = `input = input()\ns, p = input.split()`;
            break;
        }
        
        return boilerplateCode;
};

export default Boilerplate;