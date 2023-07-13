import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat8 "mo:base/Nat8";
import Int32 "mo:base/Int32";
import Text "mo:base/Text";
import Map "mo:hashmap/Map";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";

actor BlockTodo {
  public type Todo = {
    content : Text;
  };

  public type Fact = {
    id : Text;
    name : Text;
    description : Text;
    images : [Text]
  };

  var mapOfFacts = TrieMap.TrieMap<Text, Fact>(Text.equal, Text.hash);

  // ------------------------------------SPACE------------------------------------------------------

  public shared func saveFact(fact : Fact) : async Bool {
    let id = fact.id;
    mapOfFacts.put(id, fact);
    return true;
  };

  public shared query func getFacts() : async [Fact] {
    let facts = Iter.toArray(mapOfFacts.vals());
    return facts;
  };


  public shared func deleteFact(id: Text) : async Bool {
    mapOfFacts.delete(id);
    return true;
  };

  // ----------------------------------------------TODO----------------------------------------------

  stable var todos : List.List<Todo> = List.nil<Todo>();

  public func createTodo(contentText : Text) {

    let newTodo : Todo = {
      content = contentText;
    };

    todos := List.push(newTodo, todos);
    // Debug.print(debug_show (todos));
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
    // Debug.print(debug_show(todos));
  };

};
