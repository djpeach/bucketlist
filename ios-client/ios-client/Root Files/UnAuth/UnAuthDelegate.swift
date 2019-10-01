//
//  UnAuthDelegate.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import Foundation
import Firebase

protocol UnAuthDelegate {
    func showLogin()
    func showRegistration()
    func login(withEmail email: String, withPassword password: String, closure: @escaping (String?) -> Void)
    func register(withEmail email: String, withPassword password: String, closure: @escaping (String?) -> Void)
}
