//
//  Coordinator.swift
//  ios-client
//
//  Created by Peach, Daniel on 10/15/19.
//  Copyright © 2019 Peach, Daniel. All rights reserved.
//

import UIKit
import FirebaseAuth

class Coordinator {
    var navController: UINavigationController?
    
    init(navController: UINavigationController) {
        self.navController = navController
    }
    
    func authStateChanged() {
        navController?.popViewController(animated: false)
        if Auth.auth().currentUser != nil {
            navController?.pushViewController(RootTabBarController(), animated: false)
        } else {
            navController?.pushViewController(AuthVC(), animated: false)
        }
    }
}
