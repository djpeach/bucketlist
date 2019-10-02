//
//  Server.swift
//  ios-client
//
//  Created by Daniel Peach on 10/1/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import Foundation
import Firebase

class Server: NSObject {
    static let shared = Server()
    
    func sendTestRequest(completion: @escaping (TestResponse?, Error?) -> ()) {
//        let urlString = "http://149.162.182.139:9000/"
        let urlString = "http://192.168.1.68:9000/graphql"
        guard let url = URL(string: urlString) else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDTokenForcingRefresh(true) { idToken, error in
            if let error = error {
                print("Error getting user token: ", error)
                return
            }

            guard let idToken = idToken else { return }
            request.addValue(idToken, forHTTPHeaderField: "AuthToken")
            URLSession.shared.dataTask(with: request) { (data, resp, err) in
                if let err = err {
                    completion(nil, err)
                    print("Failed to fetch courses:", err)
                    return
                }
          
                guard let data = data else { return }
                do {
                  let testResp = try JSONDecoder().decode(TestResponse.self, from: data)
                  DispatchQueue.main.async {
                      completion(testResp, nil)
                  }
                } catch let jsonErr {
                  print("Failed to decode:", jsonErr)
                }
            }.resume()
        }
    }
}
