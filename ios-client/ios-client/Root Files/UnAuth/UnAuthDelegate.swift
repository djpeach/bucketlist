//
//  UnAuthDelegate.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import Foundation

protocol UnAuthDelegate {
    func showLogin()
    func showRegistration()
    func login()
    func register()
}
