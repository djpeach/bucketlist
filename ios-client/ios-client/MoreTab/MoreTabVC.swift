//
//  MoreTabVC.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit
import Firebase

class MoreTabVC: UIViewController {
    
    // TODO: remove this bad practice
    let logoutBtn: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.system)
        btn.backgroundColor = .white
        btn.setTitle("Logout", for: .normal)
        btn.addTarget(self, action: #selector(logout), for: .touchUpInside)
        btn.clipsToBounds = true
        btn.layer.cornerRadius = 4
        return btn
    }()
    
    @objc private func logout() {
        do {
            try Auth.auth().signOut()
            let sceneDelegate = view.window?.windowScene?.delegate as! SceneDelegate
            sceneDelegate.coordinator?.reloadRootVC()
        }  catch let signOutErr {
           print("Failed to sign out with error: \(signOutErr)")
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .red
        
        view.addSubview(logoutBtn)
        logoutBtn.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            logoutBtn.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor),
            logoutBtn.centerYAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerYAnchor),
            logoutBtn.widthAnchor.constraint(equalToConstant: 150),
            logoutBtn.heightAnchor.constraint(equalToConstant: 40)
        ])
    }
}
