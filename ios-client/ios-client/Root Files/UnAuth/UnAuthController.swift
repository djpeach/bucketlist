//
//  UnAuthVC.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

class UnAuthController: UIViewController, UnAuthDelegate {
    @objc func showLogin() {
        let loginView = LoginView()
        loginView.delegate = self
        view = loginView
    }
    
    @objc func showRegistration() {
        let registrationView = RegistrationView()
        registrationView.delegate = self
        view = registrationView
    }
    
    func login() {
        print("login")
    }
    
    func register() {
        print("register")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let loginView = LoginView()
        loginView.delegate = self
        view = loginView
        
    }
    
}
