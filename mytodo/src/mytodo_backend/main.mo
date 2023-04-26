import List "mo:base/List";
import Debug "mo:base/Debug";

actor BlockTodo {
  public type Todo = {
    content : Text;
  };

  var todos : List.List<Todo> = List.nil<Todo>();

  public func createTodo(contentText : Text) {

    let newTodo : Todo = {
      content = contentText;
    };

    todos := List.push(newTodo, todos);
    Debug.print(debug_show (todos));
  };

  public query func readTodos() : async [Todo] {
    return List.toArray(todos);
  };

  public func removeTodo(id : Nat) {
    let listFront = List.take(todos, id);
    let listBack = List.drop(todos, id + 1);
    todos := List.append(listFront, listBack);
  };

  public func updateTodo(id : Nat, updatedContent : Text) {

  let updatedTodo : Todo = {
    content = updatedContent;
  };

  let listFront = List.take(todos, id);
  let listBack = List.drop(todos, id + 1);
  todos := List.append(listFront, List.push(updatedTodo, listBack));
  Debug.print(debug_show(todos));
};

};
