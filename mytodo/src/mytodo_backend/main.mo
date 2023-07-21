import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat8 "mo:base/Nat8";
import Int32 "mo:base/Int32";
import Text "mo:base/Text";
import Map "mo:hashmap/Map";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import AssocList "mo:base/AssocList";

import Type "types";
import Error "mo:base/Error";

shared ({ caller = initializer }) actor class () {

  type Fact = Type.Fact;
  type Todo = Type.Todo;
  type Role = Type.Role;
  type Permission = Type.Permission;

  //Access control variables
  private stable var roles : AssocList.AssocList<Principal, Role> = List.nil();
  private stable var role_requests : AssocList.AssocList<Principal, Role> = List.nil();

  var mapOfFacts = HashMap.HashMap<Text, Fact>(0, Text.equal, Text.hash);

  private stable var factsEntries : [(Text, Fact)] = [];

  //----------------------------------------Access Control implimantaion---------------------------------------------------

  // Determine if a principal has a role with permissions
  func has_permission(pal : Principal, perm : Permission) : Bool {
    let role = get_role(pal);
    switch (role, perm) {
      case (? #owner or ? #admin, _) true;
      case (? #authorized, #lowest) true;
      case (_, _) false;
    };
  };

  func principal_eq(a : Principal, b : Principal) : Bool {
    return a == b;
  };

  func get_role(pal : Principal) : ?Role {
    if (pal == initializer) {
      ? #owner;
    } else {
      AssocList.find<Principal, Role>(roles, pal, principal_eq);
    };
  };

  // Reject unauthorized user identities
  func require_permission(pal : Principal, perm : Permission) : async () {
    if (has_permission(pal, perm) == false) {
      throw Error.reject("unauthorized");
    };
  };

  // Return the role of the result caller/user identity
  // public shared({ caller }) func my_role() : async ?Role {
  //     let role =  get_role(caller);
  //     return role;
  // };

  public shared func my_role(userId : Principal) : async Text {
    let role = get_role(userId);
    switch (role) {
      case (null) {
        return "unauthorized";
      };
      case (? #owner) {
        return "owner";
      };
      case (? #admin) {
        return "admin";
      };
      case (? #authorized) {
        return "authorized";
      };
    };
  };

  public shared ({ caller }) func getAllAdmins() : async [(Principal, Role)] {
    let admins = List.toArray(roles);
    return admins;
  };

  // Assign a new role to a principal
  public shared ({ caller }) func assign_role(assignee : Principal, new_role : ?Role) : async () {
    await require_permission(caller, #assign_role);

    switch new_role {
      case (? #owner) {
        throw Error.reject("Cannot assign anyone to be the owner");
      };
      case (_) {};
    };
    if (assignee == initializer) {
      throw Error.reject("Cannot assign a role to the canister owner");
    };
    roles := AssocList.replace<Principal, Role>(roles, assignee, principal_eq, new_role).0;
    role_requests := AssocList.replace<Principal, Role>(role_requests, assignee, principal_eq, null).0;
  };

  // ------------------------------------Gallary------------------------------------------------------

  public shared func saveFact(fact : Fact) : async Bool {
    let id = fact.id;
    mapOfFacts.put(id, fact);
    return true;
  };

  public shared query func getFacts() : async [Fact] {
    let facts = Iter.toArray(mapOfFacts.vals());
    return facts;
  };

  public shared func deleteFact(id : Text) : async Bool {
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

  system func preupgrade() {
    factsEntries := Iter.toArray(mapOfFacts.entries());

  };

  system func postupgrade() {
    mapOfFacts := HashMap.fromIter<Text, Fact>(factsEntries.vals(), 0, Text.equal, Text.hash);
  };

};
