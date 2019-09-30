//
//  UnAuthVC.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit
import Firebase

class UnAuthController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let loginView = LoginView()
        loginView.delegate = self
        view = loginView
        
    }
    
}

// MARK: UnAuthDelegate functions
extension UnAuthController: UnAuthDelegate {
    
    func showLogin() {
        let loginView = LoginView()
        loginView.delegate = self
        view = loginView
    }
    
    func showRegistration() {
        let registrationView = RegistrationView()
        registrationView.delegate = self
        view = registrationView
    }
    
    func login(withEmail email: String, withPassword password: String) {
        print(email)
        print(password)
    }
    
    func register(withEmail email: String, withPassword password: String) {
        print(email)
        print(password)
        Auth.auth().createUser(withEmail: email, password: password) { res, err in
            
            if let err = err {
                print("Failed to create user: ", err)
                return
            }
            
            print("Created user: ", res?.user.uid)
        }
    }
}
