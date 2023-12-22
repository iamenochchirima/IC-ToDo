import Time "mo:base/Time";
import Blob "mo:base/Blob";
import ExtCore "./utils/Core";

module {

    public type Role = {
        #owner;
        #admin;
        #authorized;
    };

    public type Permission = {
        #assign_role;
        #lowest;
    };

    public type Todo = {
        content : Text;
    };

    public type Fact = {
        id : Text;
        name : Text;
        description : Text;
        images : [Text];
    };

    public type File = {
        ctype : Text; //"image/jpeg"
        data : [Blob];
    };
    public type Asset = {
        name : Text;
        thumbnail : ?File;
        payload : File;
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    type TokenIndex = ExtCore.TokenIndex;
  type AccountIdentifier = ExtCore.AccountIdentifier;
  type TokenIdentifier = ExtCore.TokenIdentifier;
  type SubAccount = ExtCore.SubAccount;
  type Time = Time.Time;

  public type MintingRequest = {
    to : AccountIdentifier;
    asset : Nat32;
  };
  
  //Marketplace
  public type Transaction = {
    token : TokenIdentifier;
    seller : Principal;
    price : Nat64;
    buyer : AccountIdentifier;
    time : Time;
  };
  public type Settlement = {
    seller : Principal;
    price : Nat64;
    subaccount : SubAccount;
    buyer : AccountIdentifier;
  };
  public type Listing = {
    seller : Principal;
    price : Nat64;
    locked : ?Time;
  };
  public type ListRequest = {
    token : TokenIdentifier;
    from_subaccount : ?SubAccount;
    price : ?Nat64;
  };
  public type AccountBalanceArgs = { account : AccountIdentifier };
  public type ICPTs = { e8s : Nat64 };
  public type SendArgs = {
    memo: Nat64;
    amount: ICPTs;
    fee: ICPTs;
    from_subaccount: ?SubAccount;
    to: AccountIdentifier;
    created_at_time: ?Time;
  };
  public type UpdateRequest = {
    assetID : Nat;
    payload : File;
  };

  // Cap
   public type CapDetailValue = {
    #I64 : Int64;
    #U64 : Nat64;
    #Vec : [CapDetailValue];
    #Slice : [Nat8];
    #Text : Text;
    #True;
    #False;
    #Float : Float;
    #Principal : Principal;
  };
  public type CapEvent = {
    time : Nat64;
    operation : Text;
    details : [(Text, CapDetailValue)];
    caller : Principal;
  };
  public type CapIndefiniteEvent = {
    operation : Text;
    details : [(Text, CapDetailValue)];
    caller : Principal;
  };
   public type canister_id = Principal;

};
