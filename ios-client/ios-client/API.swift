//  This file was automatically generated and should not be edited.

import Apollo
import Foundation

public final class GetAllUsersQuery: GraphQLQuery {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition =
    """
    query GetAllUsers {
      getAllUsers {
        __typename
        firstName
        lastName
      }
    }
    """

  public let operationName = "GetAllUsers"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Accessors"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("getAllUsers", type: .list(.object(GetAllUser.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(getAllUsers: [GetAllUser?]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Accessors", "getAllUsers": getAllUsers.flatMap { (value: [GetAllUser?]) -> [ResultMap?] in value.map { (value: GetAllUser?) -> ResultMap? in value.flatMap { (value: GetAllUser) -> ResultMap in value.resultMap } } }])
    }

    public var getAllUsers: [GetAllUser?]? {
      get {
        return (resultMap["getAllUsers"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [GetAllUser?] in value.map { (value: ResultMap?) -> GetAllUser? in value.flatMap { (value: ResultMap) -> GetAllUser in GetAllUser(unsafeResultMap: value) } } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [GetAllUser?]) -> [ResultMap?] in value.map { (value: GetAllUser?) -> ResultMap? in value.flatMap { (value: GetAllUser) -> ResultMap in value.resultMap } } }, forKey: "getAllUsers")
      }
    }

    public struct GetAllUser: GraphQLSelectionSet {
      public static let possibleTypes = ["User"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("firstName", type: .scalar(String.self)),
        GraphQLField("lastName", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(firstName: String? = nil, lastName: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "User", "firstName": firstName, "lastName": lastName])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var firstName: String? {
        get {
          return resultMap["firstName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "firstName")
        }
      }

      public var lastName: String? {
        get {
          return resultMap["lastName"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "lastName")
        }
      }
    }
  }
}
