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
    
    func register(withEmail email: String, withPassword password: String, closure: @escaping (_ err: String?) -> Void) {
        Auth.auth().createUser(withEmail: email, password: password) { res, err in
            
            if let e = err {
                closure(e.localizedDescription)
                return
            }
            
            let sceneDelegate = self.view.window?.windowScene?.delegate as! SceneDelegate
            sceneDelegate.reloadRootViewController()
        }
    }
}
