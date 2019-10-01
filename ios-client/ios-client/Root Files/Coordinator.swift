//
//  Coordinator.swift
//  ios-client
//
//  Created by Daniel Peach on 10/1/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import Foundation
import UIKit
import Firebase

class Coordinator {
    var navController: UINavigationController?
    
    init(navController: UINavigationController) {
        self.navController = navController
    }
    
    public func reloadRootVC() {
        var vc: UIViewController
        if Auth.auth().currentUser != nil {
            vc = RootTabBarController()
        } else {
            vc = UnAuthController()
        }
        navController?.popViewController(animated: false)
        navController?.pushViewController(vc, animated: false)
    }
}
