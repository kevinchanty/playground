class Node {
  val: number;
  next: Node | null;
  random: Node | null;

  constructor(val?: number, next?: Node, random?: Node) {
    this.val = val === undefined ? 0 : val;

    this.next = next === undefined ? null : next;

    this.random = random === undefined ? null : random;
  }
}

function copyRandomList(head: Node | null): Node | null {
  if (!head) return null;

  let newList = new Map();

  let current: Node | null = head;
  while (current) {
    newList.set(current, new Node(current.val));
    current = current.next;
  }

  current = head;

  while (current) {
    newList.get(current).next = newList.get(current.next) ?? null;
    newList.get(current).random = newList.get(current.random) ?? null;

    current = current.next;
  }

  return newList.get(head);
}

export {};
